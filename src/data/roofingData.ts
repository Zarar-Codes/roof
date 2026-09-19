import { BusinessConfig, Service, ServiceArea, Project, GalleryItem, FAQItem, Testimonial } from '../types';

export const initialBusinessConfig: BusinessConfig = {
  name: "IronClad Industrial Roofing",
  legalEntity: "IronClad Roofing & Building Envelope Systems LLC",
  licenseNumber: "IL-ROOF #104.018932",
  insuranceCoverage: "$5,000,000 Commercial General Liability & Full Workman's Comp",
  primaryPhone: "(800) 555-7663",
  emergencyPhone: "(800) 555-ROOF",
  email: "dispatch@ironcladroofing.com",
  dispatchAddress: "4800 Industrial Parkway, Suite 100, Chicago, IL 60609",
  serviceRadiusMiles: 65,
  hoursWeekday: "06:30 AM – 06:00 PM CST",
  hoursSaturday: "07:00 AM – 02:00 PM CST",
  emergencyDispatchAvailability: "24/7 Emergency Dispatch Available for Structural Leaks",
  primaryServiceArea: "Greater Chicagoland & Northern Illinois Industrial Corridor",
  yearsInBusiness: 26,
  certifications: [
    "NRCA Certified Master Roofing Contractor",
    "Carlisle SynTec Authorized Applicator",
    "GAF Master Elite Commercial & Residential",
    "OSHA-30 Certified Site Supervisors",
    "FAA Part 107 Licensed Aerial Thermographers"
  ]
};

export const servicesData: Service[] = [
  {
    id: "serv-1",
    slug: "commercial-flat-roofing",
    title: "Commercial Flat & Low-Slope Roofing",
    category: "commercial",
    tagline: "Engineered single-ply TPO, EPDM, and PVC systems for industrial and commercial facilities.",
    shortDescription: "High-performance membrane installations, mechanically fastened or fully adhered, engineered for maximum puncture resistance and energy efficiency.",
    fullDescription: "IronClad delivers industrial-grade single-ply and multi-ply low-slope roof assemblies designed to withstand severe thermal expansion, chemical exposure, and standing water. We partner directly with Tier-1 membrane manufacturers to engineer tapered insulation packages that eliminate ponding and dramatically reduce HVAC loads.",
    materials: ["Carlisle 60/80-mil TPO", "Sika Sarnafil PVC", "Firestone EPDM", "Polyiso Rigid Insulation R-30+"],
    warrantyYears: "20 to 30-Year NDL (No Dollar Limit) Manufacturer Warranty",
    iconName: "Building2",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80",
    diagramTitle: "Four-Layer Engineered Low-Slope Membrane Assembly",
    systemLayers: [
      { layer: 1, name: "Structural Metal / Concrete Deck", function: "Engineered load-bearing base substrate" },
      { layer: 2, name: "Vapor Barrier & Tapered Polyiso Insulation", function: "R-30+ thermal envelope with directional slope drainage" },
      { layer: 3, name: "High-Density Coverboard (DensDeck)", function: "Impact resistance against hail and rooftop mechanical traffic" },
      { layer: 4, name: "Heat-Welded 60-mil TPO/PVC Membrane", function: "Monolithic, watertight UV & weather barrier with hot-air robotic welds" }
    ],
    processSteps: [
      { step: 1, title: "Structural Deck Assessment & Core Cuts", description: "Infrared moisture mapping and core sampling to determine insulation saturation and deck structural integrity." },
      { step: 2, title: "Tapered Slope Engineering", description: "Custom CAD tapered plan designed to achieve 1/4 inch per foot minimum positive drainage toward scuppers and internal drains." },
      { step: 3, title: "Robotic Heat-Welding Installation", description: "Automated hot-air welding of membrane laps tested to exceed ASTM D638 tensile standards." },
      { step: 4, title: "Manufacturer NDL Certification Walkthrough", description: "Third-party technical rep inspection verifying all edge metal, parapet flashings, and curb boots for warranty issuance." }
    ],
    faqs: [
      { question: "What is the difference between TPO and EPDM?", answer: "TPO is a white thermoplastic membrane with heat-welded seams that reflects solar heat to lower cooling costs. EPDM is synthetic rubber joined with primer and tape, ideal for cold climates and high thermal stability." },
      { question: "Can a commercial flat roof be recovered without tear-off?", answer: "Yes, under local building codes, if only one roof layer exists and the underlying insulation has under 15% moisture saturation determined by thermal scan, a flute-fill overlay can save up to 40% in project costs." }
    ],
    technicalSpecs: [
      { label: "Wind Uplift Rating", value: "FM 1-90 / FM 1-120 Compliant" },
      { label: "Solar Reflectance (SRI)", value: "104 (CRRC Rated Cool Roof)" },
      { label: "Seam Peel Strength", value: "Exceeds 55 lbs/inch" }
    ]
  },
  {
    id: "serv-2",
    slug: "standing-seam-metal",
    title: "Architectural Standing Seam Metal Roofing",
    category: "specialty",
    tagline: "Heavy-gauge mechanical lock metal systems with concealed fasteners for 50+ year lifespans.",
    shortDescription: "Precision-formed 24-gauge Galvalume and aluminum standing seam roofs designed for extreme wind uplift, snow loads, and modern architectural aesthetics.",
    fullDescription: "Our metal roofing systems eliminate exposed screws that commonly leak over time. Using factory or on-site roll-formed panels with double-lock mechanical seams, we create an uninterrupted watertight barrier that handles severe freeze-thaw cycles and hurricane-force winds.",
    materials: ["24-Gauge Galvalume Steel", "Kynar 500 / Hylar 5000 PVDF Resin", "0.032 Aluminum for Coastal/Industrial", "High-Temp Underlayment"],
    warrantyYears: "40-Year Finish Warranty / 50-Year Substrate Warranty",
    iconName: "Layers",
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    processSteps: [
      { step: 1, title: "On-Site Digital Measurement & Roll Forming", description: "Panels custom fabricated to exact eave-to-ridge lengths, eliminating horizontal lap seams." },
      { step: 2, title: "Continuous High-Temp Breathable Underlayment", description: "Class A fire-rated synthetic barrier rated for 250°F continuous heat exposure beneath metal." },
      { step: 3, title: "Concealed Stainless Expansion Clips", description: "Floating clip fasteners allow panels to freely expand and contract through seasonal temperature swings." },
      { step: 4, title: "Mechanical Seaming", description: "Electrically powered seaming robot crimps the interlocking rib profile into a permanent watertight double seam." }
    ],
    faqs: [
      { question: "Is a metal roof noisy during rain storms?", answer: "No. When installed over solid plywood decking and acoustic high-density underlayment, interior decibel levels during heavy rain are identical to asphalt shingles." },
      { question: "How does standing seam handle hail impact?", answer: "Our 24-gauge panels hold UL 2218 Class 4 impact certification—the highest industry rating—preventing punctures and qualifying many buildings for insurance premium discounts." }
    ],
    technicalSpecs: [
      { label: "Panel Gauge", value: "24-Gauge Structural Steel" },
      { label: "Wind Rating", value: "Tested up to 140 MPH Wind Shear" },
      { label: "Fire Rating", value: "UL Class A Non-Combustible" }
    ]
  },
  {
    id: "serv-3",
    slug: "architectural-shingle-replacement",
    title: "Architectural & Impact-Resistant Shingles",
    category: "residential",
    tagline: "Heavyweight dimensional fiberglass asphalt shingles engineered for Midwest storm resilience.",
    shortDescription: "Complete roof tear-off and replacement featuring Class 4 impact shingles, ice and water shield on all valleys and eaves, and balanced ridge ventilation.",
    fullDescription: "Residential roofs require uncompromising weather protection. We install multi-layered architectural shingles reinforced with SBS polymer-modified asphalt that resists 130 MPH wind gusts, algae staining, and baseball-sized hail, backed by comprehensive manufacturer non-prorated system warranties.",
    materials: ["CertainTeed Landmark Pro / NorthGate", "GAF Timberline HDZ", "Self-Adhered Ice & Water Membrane", "Cobra Ridge Vent System"],
    warrantyYears: "50-Year Non-Prorated Lifetime System Warranty",
    iconName: "Home",
    heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80",
    processSteps: [
      { step: 1, title: "Clean Tear-Off & Deck Inspection", description: "Complete removal down to the wood deck, followed by rot inspection and renailing of loose plywood sheets." },
      { step: 2, title: "Critical Zone Water Protection", description: "Installation of rubberized ice & water barrier 6 feet up eaves, all valleys, rakes, chimneys, and pipe flashings." },
      { step: 3, title: "6-Nail High-Wind Pattern Installation", description: "Shingles secured using 6 corrosion-resistant ring-shank nails per shingle into solid structural framing." },
      { step: 4, title: "Ventilation Optimization & Magnetic Sweep", description: "Calculating balanced Net Free Vent Area (NFVA) for ridge vents, followed by two thorough magnetic sweeps for nails." }
    ],
    faqs: [
      { question: "How do I know if my shingles need replacement or just repair?", answer: "Granule loss exposing black fiberglass mat, curled edges, brittle shingles that crack when lifted, or interior attic decking moisture are primary indicators that replacement is required." },
      { question: "How long does a residential roof replacement take?", answer: "Most single-family residential projects between 2,500 and 4,500 square feet are fully torn off, dry-in protected, and shingled within 1 to 2 business days." }
    ],
    technicalSpecs: [
      { label: "Impact Classification", value: "UL 2218 Class 4 Rated" },
      { label: "Wind Warranty", value: "130 MPH Wind Blow-Off Protection" },
      { label: "Algae Resistance", value: "25-Year StreakFighter Warranty" }
    ]
  },
  {
    id: "serv-4",
    slug: "drone-thermal-roof-inspection",
    title: "Drone & Thermal Infrared Roof Inspections",
    category: "commercial",
    tagline: "Non-destructive aerial thermography, moisture mapping, and comprehensive engineering reports.",
    shortDescription: "FAA Part 107 certified drone pilots utilize FLIR radiometric thermal cameras to detect trapped subsurface moisture and insulation decay before costly structural failures occur.",
    fullDescription: "Traditional roof inspections often miss subsurface moisture trapped beneath roof membranes. Our drone thermal scans take advantage of thermal mass differentials at sunset to produce high-resolution radiometric heat maps, pinpointing exact leak entry points without tearing into your roof.",
    materials: ["FLIR Radiometric Thermal Sensors", "4K Ultra-HD Aerial Orthomosaics", "Tramex Dec Scanner Moisture Meters"],
    warrantyYears: "Detailed Certified Engineering Report",
    iconName: "Scan",
    heroImage: "https://images.unsplash.com/photo-1527018607616-a656a38047a7?auto=format&fit=crop&w=1200&q=80",
    processSteps: [
      { step: 1, title: "Pre-Flight Flight Path Calibration", description: "Setting automated GPS grid flights with 80% overlap for high-resolution 3D orthomosaic generation." },
      { step: 2, title: "Radiometric Sunset Thermal Scan", description: "Capturing thermal emissivity variances as solar heat radiates out of wet vs dry insulation cores." },
      { step: 3, title: "Ground Moisture Verification", description: "Physical electronic resistance testing with impedance meters to verify exact square footage of moisture." },
      { step: 4, title: "Deliverable CAD Moisture Overlay", description: "Actionable engineering report with color-coded severity zones, CAD roof drawings, and itemized repair estimates." }
    ],
    faqs: [
      { question: "How accurate is drone thermal inspection?", answer: "Thermal scans detect moisture pockets down to 1 square foot with over 95% physical verification correlation when conducted under proper ASTM C1153 conditions." },
      { question: "Can this report be submitted to insurance carriers?", answer: "Yes, our certified reports are standardized to Xactimate format and accepted by commercial insurance adjusters for storm and water intrusion claims." }
    ],
    technicalSpecs: [
      { label: "Sensor Resolution", value: "640x512 Radiometric Thermal" },
      { label: "Deliverable Format", value: "Digital PDF & CAD Layer Mapping" },
      { label: "Certification", value: "Level II Infraspection Certified" }
    ]
  },
  {
    id: "serv-5",
    slug: "emergency-leak-storm-repair",
    title: "Emergency Leak Containment & Storm Repair",
    category: "emergency",
    tagline: "Rapid-response industrial containment, heavy-duty tarping, and wind/hail structural stabilization.",
    shortDescription: "Dedicated dispatch team equipped with emergency membrane heat welders, self-contained mobile generators, and industrial crane straps for 24/7 disaster response.",
    fullDescription: "When gale-force winds tear roof perimeter flashings or fallen trees penetrate decking, every minute means escalating interior property damage. Our emergency containment crew stabilizes the building envelope within hours to prevent inventory loss and business interruption.",
    materials: ["Reinforced UV-Stabilized 12-mil Tarping", "Emergency Pressure-Sensitive Elastomeric Patches", "Sandbag Ballasting Systems"],
    warrantyYears: "100% Watertight Containment Guarantee Until Permanent Restoration",
    iconName: "ShieldAlert",
    heroImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80",
    processSteps: [
      { step: 1, title: "Emergency Dispatch within 120 Minutes", description: "Immediate mobile crew deployment with specialized containment rigging and safety harnesses." },
      { step: 2, title: "Hazard Abatement & Water Diversion", description: "Clearing storm debris, installing internal divert chutes, and establishing roof safety anchors." },
      { step: 3, title: "Mechanical Tarping & Membrane Welds", description: "Securing 2x4 batten-anchored tarps and applying cold-weather vulcanized patches to ruptured seams." },
      { step: 4, title: "Insurance Claim Documentation Package", description: "Capturing timestamped geo-tagged photographic evidence of initial damage for adjuster representation." }
    ],
    faqs: [
      { question: "What is your emergency dispatch arrival window?", answer: "We target arrival within 90–120 minutes across our primary 65-mile service radius from our central Chicago dispatch yard." },
      { question: "Will my insurance cover emergency tarping costs?", answer: "Yes. Homeowners and commercial property policies mandate that the property owner take reasonable steps to mitigate further loss, covering emergency containment under claim provisions." }
    ],
    technicalSpecs: [
      { label: "Response Window", value: "Under 2 Hours Dedicated Dispatch" },
      { label: "Wind Rating of Tarping", value: "Anchored to 60 MPH Wind Load" },
      { label: "Availability", value: "24 Hours / 7 Days / 365 Days" }
    ]
  }
];

export const serviceAreasData: ServiceArea[] = [
  {
    id: "area-1",
    slug: "chicago-metro",
    city: "Chicago Metro & Cook County",
    state: "IL",
    county: "Cook County",
    zipCodes: ["60601", "60609", "60614", "60618", "60647", "60654"],
    description: "Servicing downtown high-rises, historic brownstones, and extensive South and West side industrial logistics corridors.",
    climateFactors: [
      "Heavy lake-effect snow loads requiring specialized live-load weight engineering",
      "Thermal expansion cycles spanning -15°F winter polar vortexes to 95°F summer humidity",
      "Urban heat island effect calling for high-reflectance SRI cool roof assemblies"
    ],
    turnaroundTime: "Within 24 Hours for Assessments / 2hr Emergency",
    featuredProjectsCount: 142
  },
  {
    id: "area-2",
    slug: "naperville-fox-valley",
    city: "Naperville & Fox Valley",
    state: "IL",
    county: "DuPage & Kane Counties",
    zipCodes: ["60540", "60563", "60564", "60565", "60134", "60174"],
    description: "Full coverage for executive commercial business parks, research campuses, and custom residential architectural properties.",
    climateFactors: [
      "Open prairie microclimates with frequent straight-line wind gusts exceeding 70 MPH",
      "Severe summer hail corridors demanding Class 4 UL 2218 impact-resistant shingle and metal systems",
      "Rapid temperature fluctuations accelerating ice-dam formations on residential eaves"
    ],
    turnaroundTime: "Same-Day Assessments Available",
    featuredProjectsCount: 98
  },
  {
    id: "area-3",
    slug: "schaumburg-northwest",
    city: "Schaumburg & Northwest Suburbs",
    state: "IL",
    county: "Cook & Lake Counties",
    zipCodes: ["60173", "60193", "60004", "60005", "60067", "60089"],
    description: "Specialized low-slope maintenance and replacement for corporate headquarters, manufacturing plants, and retail centers.",
    climateFactors: [
      "Large-footprint low-slope roofs requiring continuous internal drain maintenance",
      "High roof-top mechanical vibration from heavy rooftop HVAC units needing heavy-duty walk pads",
      "Strict municipal commercial building codes and energy code compliance standards"
    ],
    turnaroundTime: "Scheduled within 24-48 Hours",
    featuredProjectsCount: 116
  },
  {
    id: "area-4",
    slug: "joliet-will-county",
    city: "Joliet & Will County Industrial Corridor",
    state: "IL",
    county: "Will County",
    zipCodes: ["60431", "60432", "60435", "60446", "60451", "60490"],
    description: "The nation's premier inland logistics and intermodal transport hub with millions of square feet of warehouse roofing.",
    climateFactors: [
      "Vast roof surfaces requiring automated laser-guided drainage systems",
      "Intensive 24/7 forklift and rooftop vibration requiring elastomeric membrane flexibility",
      "Corrosion considerations near intermodal and heavy chemical shipping terminals"
    ],
    turnaroundTime: "Dedicated Industrial Dispatch Fleet",
    featuredProjectsCount: 84
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    slug: "apex-logistics-distribution-center",
    title: "Apex Logistics Distribution Center",
    serviceCategory: "commercial",
    serviceSlug: "commercial-flat-roofing",
    location: "Joliet, IL",
    sqFt: 52000,
    pitch: "1/4:12 Tapered",
    material: "Carlisle 80-mil TPO with R-30 Polyiso & DensDeck",
    completedDate: "October 2025",
    description: "Complete removal of aged ballasted EPDM system and installation of an energy-efficient Carlisle 80-mil TPO cool roof. We engineered a custom 4-way tapered insulation layout that directed over 50,000 gallons of peak rainwater per hour straight into reinforced 8-inch commercial scupper boxes.",
    beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true,
    technicalHighlights: [
      "Zero business interruption during 18-day installation window",
      "Reduced facility summertime rooftop surface temperatures by 48°F",
      "30-Year Carlisle Golden Seal Manufacturer NDL Warranty issued"
    ]
  },
  {
    id: "proj-2",
    slug: "highland-estate-standing-seam",
    title: "Highland Park Architectural Standing Seam",
    serviceCategory: "specialty",
    serviceSlug: "standing-seam-metal",
    location: "Highland Park, IL",
    sqFt: 7800,
    pitch: "8:12 Steep Slope",
    material: "24-Gauge Galvalume Steel in Matte Dark Zinc Kynar 500",
    completedDate: "August 2025",
    description: "Custom residential transformation replacing failing cedar shake with 1.75-inch snap-lock standing seam metal. All flashings, crickets, and eave details were hand-brake formed on site using matching 24-gauge flat stock to preserve clean architectural sightlines.",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true,
    technicalHighlights: [
      "UL 2218 Class 4 Impact Resistant for maximum hail durability",
      "Zero exposed screws across the entire 7,800 sq ft building envelope",
      "Estimated 60+ year maintenance-free lifecycle"
    ]
  },
  {
    id: "proj-3",
    slug: "oak-brook-corporate-campus-restoration",
    title: "Oak Brook Corporate Campus Restoration",
    serviceCategory: "commercial",
    serviceSlug: "commercial-flat-roofing",
    location: "Oak Brook, IL",
    sqFt: 38500,
    pitch: "1/8:12 Low-Slope",
    material: "Sika Sarnafil 80-mil PVC Membrane with RhinoBond Welds",
    completedDate: "November 2025",
    description: "High-tech induction-welded PVC installation on a Class A medical office building. Work was conducted under stringent hospital vibration and noise regulations utilizing electromagnetic RhinoBond induction tools without puncturing the waterproof membrane.",
    beforeImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true,
    technicalHighlights: [
      "Non-penetrating induction welding eliminated 12,000 deck penetrations",
      "Classified FM 1-120 wind uplift rating",
      "Chemical and grease resistant membrane around rooftop mechanicals"
    ]
  },
  {
    id: "proj-4",
    slug: "naperville-craftsman-impact-roofing",
    title: "Naperville Luxury Residence Hail Restoration",
    serviceCategory: "residential",
    serviceSlug: "architectural-shingle-replacement",
    location: "Naperville, IL",
    sqFt: 5400,
    pitch: "10:12 Steep Pitch",
    material: "CertainTeed NorthGate Class 4 SBS Modified Shingles",
    completedDate: "June 2025",
    description: "Catastrophic storm recovery following 2-inch hail event. Complete tear-off, replacing 68 sheets of compromised decking, custom copper chimney pan flashings, and complete installation of SBS polymer shingles that stay pliable even below freezing.",
    beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false,
    technicalHighlights: [
      "Full insurance claim coverage handled with itemized Xactimate documentation",
      "Hand-soldered 16oz copper valley and chimney flashings",
      "CertainTeed 50-Year SureStart PLUS 5-Star Warranty"
    ]
  }
];

export const galleryItemsData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Robotic Hot-Air Seam Welding on TPO",
    category: "commercial",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80",
    altText: "Automated hot air welding robot joining thermoplastic polyolefin commercial roof membrane seams",
    caption: "Automatic hot-air welding operates at 1000°F to fuse molecular membrane chains into monolithic seams.",
    year: "2025"
  },
  {
    id: "gal-2",
    title: "Standing Seam Ridge Flashing & Clamps",
    category: "metal",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    altText: "Standing seam architectural metal roof detail showing concealed fastener ridge assembly",
    caption: "Concealed ridge ventilation detail allows airflow while locking out driven snow and heavy winds.",
    year: "2025"
  },
  {
    id: "gal-3",
    title: "FLIR Radiometric Thermal Inspection Flight",
    category: "inspection",
    imageUrl: "https://images.unsplash.com/photo-1527018607616-a656a38047a7?auto=format&fit=crop&w=800&q=80",
    altText: "Drone quadcopter with thermal sensor hovering over industrial warehouse roof",
    caption: "Capturing thermal emissivity data at dusk to map subsurface insulation moisture non-destructively.",
    year: "2025"
  },
  {
    id: "gal-4",
    title: "Class 4 Impact Architectural Shingle Array",
    category: "residential",
    imageUrl: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80",
    altText: "High contrast architectural shingles with copper drip edge and ice and water barrier installed",
    caption: "Steep-pitch architectural shingles with double-layer shadow bands and copper drip edge.",
    year: "2025"
  },
  {
    id: "gal-5",
    title: "Commercial Parapet Wall Termination Bar",
    category: "commercial",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    altText: "Aluminum termination bar bolted into masonry parapet wall with polyurethane sealant",
    caption: "Engineered aluminum termination bars mechanically fastened every 6 inches into concrete.",
    year: "2025"
  },
  {
    id: "gal-6",
    title: "Emergency Storm Damage Stabilization",
    category: "restoration",
    imageUrl: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80",
    altText: "Heavy duty industrial crane securing structural containment tarping after severe storm",
    caption: "Rapid storm deployment securing heavy 12-mil structural tarping with mechanical anchor battens.",
    year: "2025"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    customerName: "David Sterling",
    roleOrNeighborhood: "VP of Operations, MidStates Logistics Park (Joliet)",
    serviceRendered: "52,000 Sq Ft TPO Roof Replacement",
    rating: 5,
    date: "November 2025",
    quote: "IronClad ran a 52,000 sq ft tear-off while our warehouse operated 24/7. Not a drop of water penetrated our facility, and their daily drone progress reports gave our board total confidence. The 30-year Carlisle NDL warranty arrived two weeks after completion.",
    verifiedInspection: true
  },
  {
    id: "test-2",
    customerName: "Elena Rostova, AIA",
    roleOrNeighborhood: "Principal Architect, Studio North (Highland Park)",
    serviceRendered: "Custom Standing Seam Metal Installation",
    rating: 5,
    date: "September 2025",
    quote: "As an architect, sloppy flashing details ruin modern residential design. IronClad's fabrication crew roll-formed 24-gauge panels on site and executed continuous concealed eave clips without a single exposed screw. Their mechanical precision is unmatched.",
    verifiedInspection: true
  },
  {
    id: "test-3",
    customerName: "Marcus Vance",
    roleOrNeighborhood: "Facility Director, Schaumburg Medical Plaza",
    serviceRendered: "Drone Thermal Moisture Survey & Membrane Repair",
    rating: 5,
    date: "July 2025",
    quote: "Two other contractors wanted to charge us $320,000 for a total tear-off. IronClad's drone thermal scan proved that only 11% of our insulation was damp. They surgically replaced the wet insulation and installed a certified recovery overlay, saving our budget over $180,000.",
    verifiedInspection: true
  },
  {
    id: "test-4",
    customerName: "Robert & Sarah Jenkins",
    roleOrNeighborhood: "Homeowners, Ashbury Subdivision (Naperville)",
    serviceRendered: "CertainTeed Class 4 Shingle System",
    rating: 5,
    date: "May 2025",
    quote: "Following the May hail storm, our yard was clean, the crew wore full safety harnesses on our 10:12 roof, and they finished the entire 5,400 sq ft roof in two days. Our insurance adjuster remarked that their documentation was the cleanest he'd seen all season.",
    verifiedInspection: true
  }
];

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is included in a certified IronClad roof inspection?",
    answer: "Our certified multi-point inspection covers structural deck integrity, core sampling, parapet flashings, perimeter coping metal, expansion joints, rooftop HVAC curbs, scupper drainage capacity, and an FAA Part 107 thermal scan when moisture intrusion is suspected. You receive a digital CAD report with photographic proof.",
    category: "inspection"
  },
  {
    id: "faq-2",
    question: "What is the difference between a Manufacturer NDL Warranty and a contractor warranty?",
    answer: "A standard contractor warranty only covers labor and becomes void if the contractor changes business entities. A Manufacturer NDL (No Dollar Limit) warranty is backed directly by Fortune 500 chemical and roofing manufacturers (Carlisle, GAF, Sika) and covers 100% of materials and replacement labor regardless of cost for up to 30 years.",
    category: "commercial"
  },
  {
    id: "faq-3",
    question: "Can I install a metal roof over my existing asphalt shingles?",
    answer: "While building codes allow up to two roof layers in certain jurisdictions, IronClad strongly recommends complete tear-off to inspect the structural wood deck, install continuous high-temperature underlayment, and ensure the 24-gauge standing seam clips fasten directly to solid substrate for maximum wind rating.",
    category: "replacement"
  },
  {
    id: "faq-4",
    question: "How do you handle commercial projects without disrupting business operations?",
    answer: "We utilize exterior debris chutes with negative-pressure dust shrouds, schedule crane hoisting during off-peak hours (early mornings or weekends), coordinate strict OSHA pedestrian exclusion zones, and employ low-odor, zero-VOC solvent adhesives inside occupied spaces.",
    category: "commercial"
  },
  {
    id: "faq-5",
    question: "How quickly can you dispatch for emergency structural roof leaks?",
    answer: "Our industrial emergency response unit operates 24/7/365 with dedicated dispatch vehicles carrying mobile generators, robotic hot-air welders, and heavy-duty 12-mil reinforced tarps. Our typical arrival time within our primary 65-mile Illinois radius is under 120 minutes.",
    category: "storm"
  },
  {
    id: "faq-6",
    question: "What does Class 4 impact resistance mean for my insurance rates?",
    answer: "UL 2218 Class 4 is the toughest impact standard in North America, tested by dropping a 2-inch steel ball from 20 feet onto the shingle without cracking the fiberglass core. Installing a certified Class 4 roof qualifies most commercial and residential property owners for 10% to 28% annual hazard insurance premium reductions.",
    category: "replacement"
  }
];
