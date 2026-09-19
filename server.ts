import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { initialBusinessConfig } from './src/data/roofingData';
import { Lead, QuoteRequest, InspectionRequest, ContactMessage, AnalyticsEvent, BusinessConfig } from './src/types';

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ironclad2026!';

// Database storage structure
interface DatabaseSchema {
  business: BusinessConfig;
  leads: Lead[];
  quotes: QuoteRequest[];
  inspections: InspectionRequest[];
  contacts: ContactMessage[];
  analytics: AnalyticsEvent[];
}

// Initial DB state
let db: DatabaseSchema = {
  business: initialBusinessConfig,
  leads: [],
  quotes: [],
  inspections: [],
  contacts: [],
  analytics: []
};

// Seed sample initial verified data so admin dashboard is realistic on launch
function seedInitialData() {
  if (db.leads.length === 0) {
    db.leads = [
      {
        id: "lead-101",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        fullName: "Marcus Holloway",
        phone: "(312) 555-0192",
        email: "m.holloway@midwestlogistics.com",
        propertyAddress: "2200 S Canalport Ave, Chicago, IL 60608",
        propertyType: "commercial",
        serviceRequested: "commercial-flat-roofing",
        status: "new",
        urgency: "urgent",
        notes: "Warehouse membrane leak near loading bay 4.",
        source: "Emergency CTA"
      },
      {
        id: "lead-102",
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
        fullName: "Catherine Vance",
        phone: "(630) 555-4821",
        email: "cvance@vancedesign.com",
        propertyAddress: "1420 Hobson Rd, Naperville, IL 60540",
        propertyType: "residential",
        serviceRequested: "standing-seam-metal",
        status: "qualified",
        urgency: "routine",
        notes: "Architectural consultation for custom matte black standing seam.",
        source: "Quote Request"
      }
    ];
  }

  if (db.quotes.length === 0) {
    db.quotes = [
      {
        id: "quote-201",
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        fullName: "Raymond Chen",
        phone: "(847) 555-7390",
        email: "rchen@chenproperties.com",
        propertyAddress: "950 E Algonquin Rd, Schaumburg, IL 60173",
        propertyType: "commercial",
        approximateSqFt: 35000,
        pitchType: "flat",
        materialPreference: "Carlisle 60-mil TPO",
        timeframe: "1-3_months",
        description: "Retail strip center needing full re-roof and R-30 insulation update.",
        calculatedEstimateLow: 192500,
        calculatedEstimateHigh: 245000,
        status: "contacted",
        notes: "Follow-up scheduled for Tuesday on-site core sampling."
      }
    ];
  }

  if (db.inspections.length === 0) {
    db.inspections = [
      {
        id: "insp-301",
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        fullName: "Angela Miller",
        phone: "(815) 555-6211",
        email: "angela@millermanufacturing.com",
        propertyAddress: "3800 Brandon Rd, Joliet, IL 60436",
        propertyType: "industrial",
        preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        preferredTime: "morning",
        thermalDroneRequested: true,
        activeLeaks: true,
        notes: "Ponding water observed near AHU-2 unit.",
        status: "scheduled"
      }
    ];
  }

  if (db.contacts.length === 0) {
    db.contacts = [
      {
        id: "msg-401",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        name: "Gregory Vance, PE",
        email: "gregory@vanceengineering.com",
        phone: "(312) 555-3819",
        subject: "Structural Deck Specification Inquiry",
        message: "We are specifying 24-gauge standing seam metal panels for a municipal library project in Cook County and need your certified FM 1-90 wind uplift engineering test sheets.",
        isRead: false
      }
    ];
  }

  if (db.analytics.length === 0) {
    // Seed initial event baseline
    const now = Date.now();
    const eventTypes: ('page_view' | 'cta_click' | 'phone_click' | 'quote_start' | 'quote_submit')[] = [
      'page_view', 'page_view', 'page_view', 'cta_click', 'page_view', 'phone_click', 'quote_start', 'quote_submit'
    ];
    for (let i = 0; i < 28; i++) {
      db.analytics.push({
        id: `ev-${i}`,
        timestamp: new Date(now - (28 - i) * 3600000 * 3).toISOString(),
        eventName: eventTypes[i % eventTypes.length],
        path: i % 2 === 0 ? '/' : (i % 3 === 0 ? '/services' : '/request-a-quote'),
        meta: { referrer: 'direct' }
      });
    }
  }
}

// Ensure data folder and load/save persistence
function loadDatabase() {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(data);
    } else {
      seedInitialData();
      saveDatabase();
    }
  } catch (err) {
    console.error('Failed to load database from disk:', err);
    seedInitialData();
  }
}

function saveDatabase() {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database to disk:', err);
  }
}

// In-memory active admin sessions
const activeSessions = new Set<string>();

// Simple sliding window rate limiter
const ipRateMap = new Map<string, { count: number; resetTime: number }>();
function rateLimiter(limit: number = 60, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    const now = Date.now();
    const entry = ipRateMap.get(ip);

    if (!entry || now > entry.resetTime) {
      ipRateMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (entry.count >= limit) {
      return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
    }

    entry.count += 1;
    next();
  };
}

// Sanitize helper
function sanitizeString(str: any): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Admin auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
  }
  const token = authHeader.substring(7);
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Session expired or invalid.' });
  }
  next();
}

async function startServer() {
  loadDatabase();
  const app = express();

  app.use(express.json({ limit: '10mb' }));

  // ----------------------------------------------------
  // API ROUTES
  // ----------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'IronClad Industrial Roofing API',
      timestamp: new Date().toISOString(),
      counts: {
        leads: db.leads.length,
        quotes: db.quotes.length,
        inspections: db.inspections.length,
        messages: db.contacts.length
      }
    });
  });

  // Business info endpoints
  app.get('/api/business', (req, res) => {
    res.json(db.business || initialBusinessConfig);
  });

  app.put('/api/business', requireAdmin, (req, res) => {
    const updated = req.body as Partial<BusinessConfig>;
    db.business = { ...db.business, ...updated };
    saveDatabase();
    res.json({ success: true, business: db.business });
  });

  // Authentication routes
  app.post('/api/auth/login', rateLimiter(10, 60000), (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex');
      activeSessions.add(token);
      return res.json({
        success: true,
        token,
        user: { username: ADMIN_USERNAME, role: 'Operations Director' }
      });
    }
    return res.status(401).json({ error: 'Invalid username or security password.' });
  });

  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (activeSessions.has(token)) {
        return res.json({ authenticated: true, user: { username: ADMIN_USERNAME, role: 'Operations Director' } });
      }
    }
    res.status(401).json({ authenticated: false });
  });

  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      activeSessions.delete(token);
    }
    res.json({ success: true });
  });

  // LEADS ENDPOINTS
  app.post('/api/leads', rateLimiter(20, 60000), (req, res) => {
    const { fullName, phone, email, propertyAddress, propertyType, serviceRequested, urgency, notes, source, _hp } = req.body;
    
    // Honeypot spam protection
    if (_hp) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Full name and contact phone number are required.' });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      fullName: sanitizeString(fullName),
      phone: sanitizeString(phone),
      email: sanitizeString(email || ''),
      propertyAddress: sanitizeString(propertyAddress || ''),
      propertyType: propertyType || 'commercial',
      serviceRequested: sanitizeString(serviceRequested || 'general-inquiry'),
      status: 'new',
      urgency: urgency || 'routine',
      notes: sanitizeString(notes || ''),
      source: sanitizeString(source || 'Website')
    };

    db.leads.unshift(newLead);
    saveDatabase();

    // Log analytics conversion event
    db.analytics.push({
      id: `ev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventName: 'cta_click',
      path: '/leads',
      meta: { service: newLead.serviceRequested, urgency: newLead.urgency }
    });

    res.status(201).json({ success: true, lead: newLead });
  });

  app.get('/api/leads', requireAdmin, (req, res) => {
    res.json(db.leads);
  });

  app.put('/api/leads/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const index = db.leads.findIndex(l => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found.' });
    }
    if (status) db.leads[index].status = status;
    if (notes !== undefined) db.leads[index].notes = sanitizeString(notes);
    saveDatabase();
    res.json({ success: true, lead: db.leads[index] });
  });

  app.delete('/api/leads/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    db.leads = db.leads.filter(l => l.id !== id);
    saveDatabase();
    res.json({ success: true });
  });

  // QUOTES ENDPOINTS (With instant mathematical cost estimation logic)
  app.post('/api/quotes', rateLimiter(15, 60000), (req, res) => {
    const {
      fullName, phone, email, propertyAddress, propertyType,
      approximateSqFt, pitchType, materialPreference, timeframe, description, _hp
    } = req.body;

    if (_hp) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!fullName || !phone || !approximateSqFt) {
      return res.status(400).json({ error: 'Name, phone, and approximate square footage are required.' });
    }

    const sqFt = Math.max(500, Number(approximateSqFt) || 2000);
    
    // Industrial engineering estimation parameters
    let baseRatePerSqFt = 5.50; // Standard commercial single-ply / residential architectural
    if (materialPreference?.includes('TPO') || materialPreference?.includes('PVC')) {
      baseRatePerSqFt = 6.20;
    } else if (materialPreference?.includes('Metal') || materialPreference?.includes('Standing Seam')) {
      baseRatePerSqFt = 12.50;
    } else if (materialPreference?.includes('Shingle') || materialPreference?.includes('Impact')) {
      baseRatePerSqFt = 4.85;
    }

    // Pitch multiplier
    let pitchMultiplier = 1.0;
    if (pitchType === 'low') pitchMultiplier = 1.05;
    if (pitchType === 'medium') pitchMultiplier = 1.18;
    if (pitchType === 'steep') pitchMultiplier = 1.35;

    const calculatedLow = Math.round(sqFt * baseRatePerSqFt * pitchMultiplier * 0.92);
    const calculatedHigh = Math.round(sqFt * baseRatePerSqFt * pitchMultiplier * 1.15);

    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      fullName: sanitizeString(fullName),
      phone: sanitizeString(phone),
      email: sanitizeString(email || ''),
      propertyAddress: sanitizeString(propertyAddress || ''),
      propertyType: propertyType || 'commercial',
      approximateSqFt: sqFt,
      pitchType: pitchType || 'flat',
      materialPreference: sanitizeString(materialPreference || 'Standard Specification'),
      timeframe: timeframe || 'immediate',
      description: sanitizeString(description || ''),
      calculatedEstimateLow: calculatedLow,
      calculatedEstimateHigh: calculatedHigh,
      status: 'new',
      notes: ''
    };

    db.quotes.unshift(newQuote);
    saveDatabase();

    // Log quote submit event
    db.analytics.push({
      id: `ev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventName: 'quote_submit',
      path: '/request-a-quote',
      meta: { sqFt, estimatedLow: calculatedLow, estimatedHigh: calculatedHigh }
    });

    res.status(201).json({ success: true, quote: newQuote });
  });

  app.get('/api/quotes', requireAdmin, (req, res) => {
    res.json(db.quotes);
  });

  app.put('/api/quotes/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const index = db.quotes.findIndex(q => q.id === id);
    if (index === -1) return res.status(404).json({ error: 'Quote not found.' });
    if (status) db.quotes[index].status = status;
    if (notes !== undefined) db.quotes[index].notes = sanitizeString(notes);
    saveDatabase();
    res.json({ success: true, quote: db.quotes[index] });
  });

  // INSPECTIONS ENDPOINTS
  app.post('/api/inspections', rateLimiter(15, 60000), (req, res) => {
    const {
      fullName, phone, email, propertyAddress, propertyType,
      preferredDate, preferredTime, thermalDroneRequested, activeLeaks, notes, _hp
    } = req.body;

    if (_hp) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!fullName || !phone || !propertyAddress || !preferredDate) {
      return res.status(400).json({ error: 'Name, phone, address, and preferred date are required.' });
    }

    const newInspection: InspectionRequest = {
      id: `insp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      fullName: sanitizeString(fullName),
      phone: sanitizeString(phone),
      email: sanitizeString(email || ''),
      propertyAddress: sanitizeString(propertyAddress),
      propertyType: propertyType || 'commercial',
      preferredDate: sanitizeString(preferredDate),
      preferredTime: preferredTime === 'afternoon' ? 'afternoon' : 'morning',
      thermalDroneRequested: Boolean(thermalDroneRequested),
      activeLeaks: Boolean(activeLeaks),
      notes: sanitizeString(notes || ''),
      status: 'new'
    };

    db.inspections.unshift(newInspection);
    saveDatabase();

    db.analytics.push({
      id: `ev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventName: 'inspection_submit',
      path: '/schedule-inspection',
      meta: { thermalDrone: newInspection.thermalDroneRequested, activeLeaks: newInspection.activeLeaks }
    });

    res.status(201).json({ success: true, inspection: newInspection });
  });

  app.get('/api/inspections', requireAdmin, (req, res) => {
    res.json(db.inspections);
  });

  app.put('/api/inspections/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const index = db.inspections.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ error: 'Inspection not found.' });
    if (status) db.inspections[index].status = status;
    if (notes !== undefined) db.inspections[index].notes = sanitizeString(notes);
    saveDatabase();
    res.json({ success: true, inspection: db.inspections[index] });
  });

  // CONTACT MESSAGES ENDPOINTS
  app.post('/api/contact', rateLimiter(20, 60000), (req, res) => {
    const { name, email, phone, subject, message, _hp } = req.body;

    if (_hp) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      name: sanitizeString(name),
      email: sanitizeString(email),
      phone: sanitizeString(phone || ''),
      subject: sanitizeString(subject || 'General Inquiry'),
      message: sanitizeString(message),
      isRead: false
    };

    db.contacts.unshift(newMessage);
    saveDatabase();

    db.analytics.push({
      id: `ev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventName: 'contact_submit',
      path: '/contact',
      meta: { subject: newMessage.subject }
    });

    res.status(201).json({ success: true, message: newMessage });
  });

  app.get('/api/contact', requireAdmin, (req, res) => {
    res.json(db.contacts);
  });

  app.put('/api/contact/:id/read', requireAdmin, (req, res) => {
    const { id } = req.params;
    const item = db.contacts.find(c => c.id === id);
    if (item) {
      item.isRead = true;
      saveDatabase();
    }
    res.json({ success: true });
  });

  // ANALYTICS TRACKING ENDPOINTS
  app.post('/api/analytics', (req, res) => {
    const { eventName, path: eventPath, meta } = req.body;
    if (!eventName) return res.status(400).json({ error: 'eventName is required' });

    const newEvent: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      eventName,
      path: eventPath || '/',
      meta: meta || {}
    };

    db.analytics.push(newEvent);
    // Keep max 2000 events in memory
    if (db.analytics.length > 2000) {
      db.analytics.shift();
    }
    saveDatabase();
    res.json({ success: true });
  });

  app.get('/api/analytics/stats', requireAdmin, (req, res) => {
    const totalEvents = db.analytics.length;
    const pageViews = db.analytics.filter(e => e.eventName === 'page_view').length;
    const ctaClicks = db.analytics.filter(e => e.eventName === 'cta_click').length;
    const quoteSubmits = db.analytics.filter(e => e.eventName === 'quote_submit').length;
    const inspectionSubmits = db.analytics.filter(e => e.eventName === 'inspection_submit').length;
    const contactSubmits = db.analytics.filter(e => e.eventName === 'contact_submit').length;
    const phoneClicks = db.analytics.filter(e => e.eventName === 'phone_click').length;

    // Recent 7 days breakdown
    const now = Date.now();
    const dayBuckets: Record<string, { pageViews: number; leads: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 86400000).toISOString().split('T')[0];
      dayBuckets[d] = { pageViews: 0, leads: 0 };
    }

    db.analytics.forEach(e => {
      const day = e.timestamp.split('T')[0];
      if (dayBuckets[day]) {
        if (e.eventName === 'page_view') dayBuckets[day].pageViews += 1;
        if (['quote_submit', 'inspection_submit', 'contact_submit'].includes(e.eventName)) {
          dayBuckets[day].leads += 1;
        }
      }
    });

    res.json({
      totalEvents,
      pageViews,
      ctaClicks,
      quoteSubmits,
      inspectionSubmits,
      contactSubmits,
      phoneClicks,
      totalLeads: db.leads.length + db.quotes.length + db.inspections.length,
      conversionRate: pageViews > 0 ? (((db.quotes.length + db.inspections.length + db.leads.length) / pageViews) * 100).toFixed(1) : '0.0',
      timeline: Object.entries(dayBuckets).map(([date, data]) => ({ date, ...data })),
      recentActivity: db.analytics.slice(-15).reverse()
    });
  });

  // ----------------------------------------------------
  // VITE MIDDLEWARE / PRODUCTION STATIC SERVING
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IronClad Roofing Industrial Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Startup Error:', err);
});
