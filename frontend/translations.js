/* =========================================================
   Surya-Sanchay – translations.js
   Full i18n: English (en), Hindi (hi), Marathi (mr)
   ========================================================= */

const TRANSLATIONS = {

  /* ── English ─────────────────────────────────────── */
  en: {
    /* HEADER */
    'brand.en':         'Surya-Sanchay',
    'brand.hi':         'सूर्य-संचय',
    'header.lang':      'EN',
    'header.darkmode':  'Dark Mode',

    /* NAV */
    'nav.dashboard':    'Dashboard',
    'nav.solar':        'Solar',
    'nav.pumping':      'Pumping',
    'nav.grid':         'Grid',
    'nav.reports':      'Reports',
    'nav.about':        'About',

    /* STATUS BANNER */
    'banner.title':       'Solar Safe',
    'banner.subtitle':    'All systems operating normally • Grid stable • Solar active',
    'banner.legend.safe': 'Solar Safe',
    'banner.legend.warn': 'Use Battery Carefully',
    'banner.legend.stop': 'Stop Heavy Appliances',
    'banner.updated':     'Updated 2 min ago',

    /* METRIC CARDS */
    'metric.outages.label':  'Outages This Month',
    'metric.outages.sub':    'Last: 2 days ago',
    'metric.solar.label':    'Solar Hours Today',
    'metric.solar.sub':      'Peak: 11 AM–2 PM',
    'metric.water.label':    'Water Pumped Today',
    'metric.water.sub':      '85% of daily target',
    'metric.energy.label':   'Energy Saved',
    'metric.energy.sub':     'This month so far',

    /* VILLAGE CARD */
    'village.title':       'Village Information',
    'village.village':     'Village',
    'village.district':    'District',
    'village.households':  'Households',
    'village.capacity':    'Solar Capacity',
    'village.status':      'System Status',
    'village.maintenance': 'Last Maintenance',
    'village.status.val':  'Operational ✓',

    /* SOLAR FORECAST */
    'forecast.title':      "Today's Solar Forecast",
    'forecast.peak':       'Peak Generation',
    'forecast.output':     'Estimated Output',
    'forecast.uv':         'UV Index',
    'forecast.cloud':      'Cloud Cover',
    'forecast.confidence': 'Confidence',
    'forecast.badge':      '☀ Sunny',

    /* GOLDEN HOUR */
    'golden.title':    'Next Golden Hour',
    'golden.hours':    'Hours Remaining',
    'golden.starts':   'Starts:',
    'golden.duration': 'Duration:',
    'golden.output':   'Output:',

    /* TANK */
    'tank.title':    'Water Tank Fill Status',
    'tank.current':  'Current Volume',
    'tank.total':    'Total Capacity',
    'tank.rate':     'Fill Rate',
    'tank.target':   'Target by Evening',
    'tank.filled':   'FILLED',

    /* ACTIONS */
    'action.pump':     'Start Pump',
    'action.schedule': "Today's Schedule",
    'action.report':   'Download Report',

    /* NOTIFICATIONS */
    'notif.title':   'Recent Notifications',
    'notif.clear':   'Clear All',
    'notif.empty':   'No new notifications',
    'notif.1':       'Solar generation at peak — 8.2 kW output',
    'notif.2':       'Battery level at 72% — moderate usage recommended',
    'notif.3':       'Water tank refilled: 4,500 L pumped today',
    'notif.4':       'Grid outage detected — switchover to solar successful',
    'notif.5':       'System maintenance check passed — all sensors OK',
    'notif.time.1':  '2 minutes ago',
    'notif.time.2':  '15 minutes ago',
    'notif.time.3':  '1 hour ago',
    'notif.time.4':  '2 hours ago',
    'notif.time.5':  'Yesterday, 6:30 PM',

    /* SOLAR TAB */
    'solar.hero.title': 'Solar Energy Monitor',
    'solar.hero.sub':   'Real-time solar panel performance and generation data',
    'solar.current.label': 'Current Output',
    'solar.current.sub': 'Live generation',
    'solar.efficiency.label': 'Panel Efficiency',
    'solar.efficiency.sub': 'Above average',
    'solar.battery.label': 'Battery Charge',
    'solar.battery.sub': '18 kWh stored',
    'solar.total.label': "Today's Total",
    'solar.total.sub': 'Updated now',
    'solar.chart.title': '📊 Generation Trend (Last 7 Days)',

    /* PUMPING TAB */
    'pump.hero.title': 'Water Pumping System',
    'pump.hero.sub':   'Manage solar-powered water distribution for your village',
    'pump.tank.title': '💧 Tank Status',
    'pump.controls.title': '⚙ Pump Controls',
    'pump.status':  'Status',
    'pump.flow':    'Flow Rate',
    'pump.power':   'Power Draw',
    'pump.runtime': 'Run Time Today',
    'pump.start':   '▶ Start Pump',
    'pump.stop':    '■ Stop Pump',
    'pump.active':  'Active',
    'pump.volume':  'Volume',
    'pump.eta':     'ETA Full',

    /* GRID TAB */
    'grid.hero.title': 'Grid Monitor',
    'grid.hero.sub':   'Track grid connectivity, voltage, and outage history',
    'grid.status.label': 'Grid Status',
    'grid.status.val': 'Connected',
    'grid.status.sub': 'Stable — 230V',
    'grid.outages.label': 'Outages This Month',
    'grid.outages.sub': 'Total: 4.2 hrs lost',
    'grid.uptime.label': 'Grid Uptime',
    'grid.uptime.sub': 'Last 30 days',
    'grid.last.label': 'Last Outage',
    'grid.last.val': '2 days ago',
    'grid.last.sub': 'Duration: 1.5 hrs',

    /* REPORTS TAB */
    'reports.hero.title': 'Reports & Analytics',
    'reports.hero.sub': 'Download and review historical energy and water data',
    'reports.section': '📄 Available Reports',
    'reports.new':     '+ Generate New',
    'reports.r1.title': 'Monthly Energy Summary — March 2026',
    'reports.r1.sub':   'Solar generation, battery usage, grid events',
    'reports.r2.title': 'Water Pumping Log — March 2026',
    'reports.r2.sub':   'Daily pump hours, volume pumped, efficiency',
    'reports.r3.title': 'Grid Outage Report — Q1 2026',
    'reports.r3.sub':   'Outage events, duration, switchover success rate',
    'reports.download': '⬇ Download PDF',

    /* ABOUT TAB */
    'about.hero.title': 'About Surya-Sanchay',
    'about.hero.sub':  'Empowering rural India through clean solar energy',
    'about.desc': 'Surya-Sanchay (सूर्य-संचय) is a smart solar energy management platform developed under the Digital India initiative, aimed at empowering rural villages with reliable solar power monitoring, water pump management, and grid resilience tools.',
    'about.solar.title': 'Solar Monitoring',
    'about.solar.desc':  'Real-time tracking of solar panel output and efficiency',
    'about.water.title': 'Water Management',
    'about.water.desc':  'Smart scheduling for solar-powered water pumping',
    'about.grid.title':  'Grid Integration',
    'about.grid.desc':   'Seamless solar-grid hybrid for uninterrupted power',
    'about.analytics.title': 'Analytics',
    'about.analytics.desc':  'Data-driven insights for energy efficiency and savings',

    /* FOOTER */
    'footer.tagline': 'Smart Solar Management for rural India',
    'footer.govt':    'Government Portals',
    'footer.mnre':    'Ministry of New & Renewable Energy',
    'footer.digital': 'Digital India',
    'footer.mygov':   'MyGov India',
    'footer.kusum':   'PM-KUSUM Scheme',
    'footer.quick':   'Quick Links',
    'footer.manual':  'User Manual',
    'footer.videos':  'Training Videos',
    'footer.faq':     'FAQs',
    'footer.updates': 'System Updates',
    'footer.contact': 'Contact & Support',
    'footer.copy':    '© 2026 Surya-Sanchay | Government of India Initiative | All Rights Reserved',

    /* MODALS */
    'modal.pump.title':   'Start Water Pump',
    'modal.pump.desc':    'Start the solar water pump for the next scheduled cycle?',
    'modal.pump.solar':   'Current Solar Output:',
    'modal.pump.req':     'Pump Power Required:',
    'modal.pump.tank':    'Tank Level:',
    'modal.pump.cancel':  'Cancel',
    'modal.pump.confirm': '✓ Confirm Start',
    'modal.sched.title':  "Today's Schedule",
    'modal.sched.sunrise': '🌅 Sunrise / Solar Start',
    'modal.sched.pump1':  '💧 Pump Session 1',
    'modal.sched.golden': '⚡ Golden Hour (Peak)',
    'modal.sched.pump2':  '💧 Pump Session 2',
    'modal.sched.battery':'🌙 Battery Charging',
    'modal.close':        'Close',

    /* PANEL */
    'panel.notif': 'Notifications',
    'panel.n1': 'Solar generation at peak — 8.2 kW output',
    'panel.n2': 'Battery at 72% — moderate usage',
    'panel.n3': 'Water pumping complete — 4,500 L today',
    'panel.n4': 'Grid outage — solar switchover successful',

    /* TOAST */
    'toast.pump':    '✓ Water pump started successfully!',
    'toast.report':  '📄 Generating PDF report... Download will start shortly',
    'toast.cleared': 'All notifications cleared',
  },

  /* ── Hindi ───────────────────────────────────────── */
  hi: {
    /* HEADER */
    'brand.en':         'सूर्य-संचय',
    'brand.hi':         'Surya-Sanchay',
    'header.lang':      'हि',

    /* NAV */
    'nav.dashboard':    'डैशबोर्ड',
    'nav.solar':        'सौर',
    'nav.pumping':      'पंपिंग',
    'nav.grid':         'ग्रिड',
    'nav.reports':      'रिपोर्ट',
    'nav.about':        'जानकारी',

    /* STATUS BANNER */
    'banner.title':       'सौर सुरक्षित',
    'banner.subtitle':    'सभी प्रणालियाँ सामान्य रूप से चल रही हैं • ग्रिड स्थिर • सौर सक्रिय',
    'banner.legend.safe': 'सौर सुरक्षित',
    'banner.legend.warn': 'बैटरी सावधानी से उपयोग करें',
    'banner.legend.stop': 'भारी उपकरण बंद करें',
    'banner.updated':     '2 मिनट पहले अपडेट',

    /* METRIC CARDS */
    'metric.outages.label':  'इस महीने बिजली कटौती',
    'metric.outages.sub':    'अंतिम: 2 दिन पहले',
    'metric.solar.label':    'आज सौर घंटे',
    'metric.solar.sub':      'शिखर: सुबह 11–दोपहर 2',
    'metric.water.label':    'आज पानी पंप किया',
    'metric.water.sub':      'दैनिक लक्ष्य का 85%',
    'metric.energy.label':   'ऊर्जा बचत',
    'metric.energy.sub':     'इस महीने अब तक',

    /* VILLAGE CARD */
    'village.title':       'ग्राम जानकारी',
    'village.village':     'गाँव',
    'village.district':    'जिला',
    'village.households':  'घर',
    'village.capacity':    'सौर क्षमता',
    'village.status':      'सिस्टम स्थिति',
    'village.maintenance': 'अंतिम रखरखाव',
    'village.status.val':  'चालू ✓',

    /* SOLAR FORECAST */
    'forecast.title':      'आज का सौर पूर्वानुमान',
    'forecast.peak':       'अधिकतम उत्पादन',
    'forecast.output':     'अनुमानित उत्पादन',
    'forecast.uv':         'UV सूचकांक',
    'forecast.cloud':      'बादल आवरण',
    'forecast.confidence': 'विश्वास',
    'forecast.badge':      '☀ धूप',

    /* GOLDEN HOUR */
    'golden.title':    'अगला सुनहरा घंटा',
    'golden.hours':    'घंटे शेष',
    'golden.starts':   'शुरुआत:',
    'golden.duration': 'अवधि:',
    'golden.output':   'उत्पादन:',

    /* TANK */
    'tank.title':    'पानी टंकी स्थिति',
    'tank.current':  'वर्तमान मात्रा',
    'tank.total':    'कुल क्षमता',
    'tank.rate':     'भरने की दर',
    'tank.target':   'शाम तक लक्ष्य',
    'tank.filled':   'भरा हुआ',

    /* ACTIONS */
    'action.pump':     'पंप शुरू करें',
    'action.schedule': 'आज का कार्यक्रम',
    'action.report':   'PDF रिपोर्ट डाउनलोड',

    /* NOTIFICATIONS */
    'notif.title':   'हाल की सूचनाएँ',
    'notif.clear':   'सभी हटाएं',
    'notif.empty':   'कोई नई सूचना नहीं',
    'notif.1':       'सौर उत्पादन चरम पर — 8.2 kW आउटपुट',
    'notif.2':       'बैटरी 72% — मध्यम उपयोग अनुशंसित',
    'notif.3':       'पानी टंकी भरी: आज 4,500 L पंप किया',
    'notif.4':       'ग्रिड आउटेज — सौर पर स्विचओवर सफल',
    'notif.5':       'रखरखाव जांच पास — सभी सेंसर ठीक',
    'notif.time.1':  '2 मिनट पहले',
    'notif.time.2':  '15 मिनट पहले',
    'notif.time.3':  '1 घंटे पहले',
    'notif.time.4':  '2 घंटे पहले',
    'notif.time.5':  'कल, शाम 6:30',

    /* SOLAR TAB */
    'solar.hero.title': 'सौर ऊर्जा मॉनिटर',
    'solar.hero.sub':   'सौर पैनल प्रदर्शन और उत्पादन डेटा रियल-टाइम',
    'solar.current.label': 'वर्तमान आउटपुट',
    'solar.current.sub': 'लाइव उत्पादन',
    'solar.efficiency.label': 'पैनल दक्षता',
    'solar.efficiency.sub': 'औसत से ऊपर',
    'solar.battery.label': 'बैटरी चार्ज',
    'solar.battery.sub': '18 kWh संग्रहीत',
    'solar.total.label': 'आज का कुल',
    'solar.total.sub': 'अभी अपडेट',
    'solar.chart.title': '📊 उत्पादन ट्रेंड (पिछले 7 दिन)',

    /* PUMPING TAB */
    'pump.hero.title': 'जल पंपिंग प्रणाली',
    'pump.hero.sub':   'सौर-चालित जल वितरण प्रबंधन',
    'pump.tank.title': '💧 टंकी स्थिति',
    'pump.controls.title': '⚙ पंप नियंत्रण',
    'pump.status':  'स्थिति',
    'pump.flow':    'प्रवाह दर',
    'pump.power':   'बिजली खपत',
    'pump.runtime': 'आज चलने का समय',
    'pump.start':   '▶ पंप शुरू करें',
    'pump.stop':    '■ पंप बंद करें',
    'pump.active':  'सक्रिय',
    'pump.volume':  'मात्रा',
    'pump.eta':     'भरने का अनुमान',

    /* GRID TAB */
    'grid.hero.title': 'ग्रिड मॉनिटर',
    'grid.hero.sub':   'ग्रिड कनेक्टिविटी, वोल्टेज और आउटेज इतिहास',
    'grid.status.label': 'ग्रिड स्थिति',
    'grid.status.val': 'जुड़ा हुआ',
    'grid.status.sub': 'स्थिर — 230V',
    'grid.outages.label': 'इस महीने आउटेज',
    'grid.outages.sub': 'कुल: 4.2 घंटे खोए',
    'grid.uptime.label': 'ग्रिड अपटाइम',
    'grid.uptime.sub': 'पिछले 30 दिन',
    'grid.last.label': 'अंतिम आउटेज',
    'grid.last.val': '2 दिन पहले',
    'grid.last.sub': 'अवधि: 1.5 घंटे',

    /* REPORTS TAB */
    'reports.hero.title': 'रिपोर्ट और विश्लेषण',
    'reports.hero.sub': 'ऐतिहासिक ऊर्जा और जल डेटा डाउनलोड करें',
    'reports.section': '📄 उपलब्ध रिपोर्ट',
    'reports.new':     '+ नई रिपोर्ट बनाएं',
    'reports.r1.title': 'मासिक ऊर्जा सारांश — मार्च 2026',
    'reports.r1.sub':   'सौर उत्पादन, बैटरी उपयोग, ग्रिड घटनाएं',
    'reports.r2.title': 'जल पंपिंग लॉग — मार्च 2026',
    'reports.r2.sub':   'दैनिक पंप घंटे, पंप की मात्रा, दक्षता',
    'reports.r3.title': 'ग्रिड आउटेज रिपोर्ट — Q1 2026',
    'reports.r3.sub':   'आउटेज घटनाएं, अवधि, स्विचओवर सफलता दर',
    'reports.download': '⬇ PDF डाउनलोड',

    /* ABOUT TAB */
    'about.hero.title': 'सूर्य-संचय के बारे में',
    'about.hero.sub':  'स्वच्छ सौर ऊर्जा से ग्रामीण भारत को सशक्त बनाना',
    'about.desc': 'सूर्य-संचय डिजिटल इंडिया पहल के तहत विकसित एक स्मार्ट सौर ऊर्जा प्रबंधन मंच है, जिसका उद्देश्य ग्रामीण गांवों को विश्वसनीय सौर ऊर्जा निगरानी, जल पंप प्रबंधन और ग्रिड लचीलेपन उपकरणों से सशक्त बनाना है।',
    'about.solar.title': 'सौर निगरानी',
    'about.solar.desc':  'सौर पैनल आउटपुट और दक्षता की रियल-टाइम ट्रैकिंग',
    'about.water.title': 'जल प्रबंधन',
    'about.water.desc':  'सौर-चालित जल पंपिंग के लिए स्मार्ट शेड्यूलिंग',
    'about.grid.title':  'ग्रिड एकीकरण',
    'about.grid.desc':   'निर्बाध बिजली के लिए सौर-ग्रिड हाइब्रिड',
    'about.analytics.title': 'विश्लेषण',
    'about.analytics.desc':  'ऊर्जा दक्षता और बचत के लिए डेटा-आधारित अंतर्दृष्टि',

    /* FOOTER */
    'footer.tagline': 'ग्रामीण भारत के लिए स्मार्ट सौर प्रबंधन',
    'footer.govt':    'सरकारी पोर्टल',
    'footer.mnre':    'नवीन और नवीकरणीय ऊर्जा मंत्रालय',
    'footer.digital': 'डिजिटल इंडिया',
    'footer.mygov':   'माय गव इंडिया',
    'footer.kusum':   'पीएम-कुसुम योजना',
    'footer.quick':   'त्वरित लिंक',
    'footer.manual':  'उपयोगकर्ता मैनुअल',
    'footer.videos':  'प्रशिक्षण वीडियो',
    'footer.faq':     'अक्सर पूछे जाने वाले प्रश्न',
    'footer.updates': 'सिस्टम अपडेट',
    'footer.contact': 'संपर्क और सहायता',
    'footer.copy':    '© 2026 सूर्य-संचय | भारत सरकार पहल | सर्वाधिकार सुरक्षित',

    /* MODALS */
    'modal.pump.title':   'जल पंप शुरू करें',
    'modal.pump.desc':    'अगले निर्धारित चक्र के लिए सौर जल पंप शुरू करें?',
    'modal.pump.solar':   'वर्तमान सौर आउटपुट:',
    'modal.pump.req':     'पंप बिजली आवश्यक:',
    'modal.pump.tank':    'टंकी स्तर:',
    'modal.pump.cancel':  'रद्द करें',
    'modal.pump.confirm': '✓ पुष्टि करें',
    'modal.sched.title':  'आज का कार्यक्रम',
    'modal.sched.sunrise': '🌅 सूर्योदय / सौर शुरुआत',
    'modal.sched.pump1':  '💧 पंप सत्र 1',
    'modal.sched.golden': '⚡ सुनहरा घंटा (शिखर)',
    'modal.sched.pump2':  '💧 पंप सत्र 2',
    'modal.sched.battery':'🌙 बैटरी चार्जिंग',
    'modal.close':        'बंद करें',

    /* PANEL */
    'panel.notif': 'सूचनाएँ',
    'panel.n1': 'सौर उत्पादन चरम पर — 8.2 kW आउटपुट',
    'panel.n2': 'बैटरी 72% — मध्यम उपयोग',
    'panel.n3': 'पानी पंप पूरा — आज 4,500 L',
    'panel.n4': 'ग्रिड आउटेज — सौर स्विचओवर सफल',

    /* TOAST */
    'toast.pump':    '✓ पानी पंप सफलतापूर्वक शुरू!',
    'toast.report':  '📄 PDF रिपोर्ट बन रही है...',
    'toast.cleared': 'सभी सूचनाएं हटाई गईं',
  },

  /* ── Marathi ──────────────────────────────────────── */
  mr: {
    /* HEADER */
    'brand.en':         'सूर्य-संचय',
    'brand.hi':         'Surya-Sanchay',
    'header.lang':      'मर',

    /* NAV */
    'nav.dashboard':    'डॅशबोर्ड',
    'nav.solar':        'सौर',
    'nav.pumping':      'पंपिंग',
    'nav.grid':         'ग्रिड',
    'nav.reports':      'अहवाल',
    'nav.about':        'माहिती',

    /* STATUS BANNER */
    'banner.title':       'सौर सुरक्षित',
    'banner.subtitle':    'सर्व यंत्रणा सामान्यपणे चालू आहेत • ग्रिड स्थिर • सौर सक्रिय',
    'banner.legend.safe': 'सौर सुरक्षित',
    'banner.legend.warn': 'बॅटरी काळजीपूर्वक वापरा',
    'banner.legend.stop': 'जड उपकरणे बंद करा',
    'banner.updated':     '2 मिनिटांपूर्वी अद्यतनित',

    /* METRIC CARDS */
    'metric.outages.label':  'या महिन्यात वीज खंडणे',
    'metric.outages.sub':    'शेवटचे: 2 दिवसांपूर्वी',
    'metric.solar.label':    'आजचे सौर तास',
    'metric.solar.sub':      'शिखर: सकाळी 11–दुपारी 2',
    'metric.water.label':    'आज पाणी उपसले',
    'metric.water.sub':      'दैनिक लक्ष्याच्या 85%',
    'metric.energy.label':   'ऊर्जा बचत',
    'metric.energy.sub':     'या महिन्यात आतापर्यंत',

    /* VILLAGE CARD */
    'village.title':       'गाव माहिती',
    'village.village':     'गाव',
    'village.district':    'जिल्हा',
    'village.households':  'घरे',
    'village.capacity':    'सौर क्षमता',
    'village.status':      'यंत्रणा स्थिती',
    'village.maintenance': 'शेवटची देखभाल',
    'village.status.val':  'कार्यरत ✓',

    /* SOLAR FORECAST */
    'forecast.title':      'आजचे सौर अंदाज',
    'forecast.peak':       'कमाल निर्मिती',
    'forecast.output':     'अपेक्षित उत्पादन',
    'forecast.uv':         'UV निर्देशांक',
    'forecast.cloud':      'ढगाळपणा',
    'forecast.confidence': 'विश्वासार्हता',
    'forecast.badge':      '☀ ऊन',

    /* GOLDEN HOUR */
    'golden.title':    'पुढील सुवर्ण तास',
    'golden.hours':    'तास शिल्लक',
    'golden.starts':   'सुरुवात:',
    'golden.duration': 'कालावधी:',
    'golden.output':   'उत्पादन:',

    /* TANK */
    'tank.title':    'पाण्याच्या टाकीची स्थिती',
    'tank.current':  'सध्याची मात्रा',
    'tank.total':    'एकूण क्षमता',
    'tank.rate':     'भरण्याचा दर',
    'tank.target':   'संध्याकाळपर्यंत लक्ष्य',
    'tank.filled':   'भरलेले',

    /* ACTIONS */
    'action.pump':     'पंप सुरू करा',
    'action.schedule': 'आजचे वेळापत्रक',
    'action.report':   'PDF अहवाल डाउनलोड',

    /* NOTIFICATIONS */
    'notif.title':   'अलीकडील सूचना',
    'notif.clear':   'सर्व हटवा',
    'notif.empty':   'नवीन सूचना नाहीत',
    'notif.1':       'सौर निर्मिती शिखरावर — 8.2 kW आउटपुट',
    'notif.2':       'बॅटरी 72% — मध्यम वापर शिफारस',
    'notif.3':       'पाण्याची टाकी भरली: आज 4,500 L उपसले',
    'notif.4':       'ग्रिड बंद — सौर वर स्विचओव्हर यशस्वी',
    'notif.5':       'देखभाल तपासणी पास — सर्व सेन्सर ठीक',
    'notif.time.1':  '2 मिनिटांपूर्वी',
    'notif.time.2':  '15 मिनिटांपूर्वी',
    'notif.time.3':  '1 तासापूर्वी',
    'notif.time.4':  '2 तासांपूर्वी',
    'notif.time.5':  'काल, सं. 6:30',

    /* SOLAR TAB */
    'solar.hero.title': 'सौर ऊर्जा मॉनिटर',
    'solar.hero.sub':   'सौर पॅनेल कार्यक्षमता आणि उत्पादन डेटा रिअल-टाइम',
    'solar.current.label': 'सध्याचे आउटपुट',
    'solar.current.sub': 'थेट निर्मिती',
    'solar.efficiency.label': 'पॅनेल कार्यक्षमता',
    'solar.efficiency.sub': 'सरासरीपेक्षा जास्त',
    'solar.battery.label': 'बॅटरी चार्ज',
    'solar.battery.sub': '18 kWh साठवले',
    'solar.total.label': 'आजचे एकूण',
    'solar.total.sub': 'आत्ता अद्यतनित',
    'solar.chart.title': '📊 निर्मिती ट्रेंड (मागील 7 दिवस)',

    /* PUMPING TAB */
    'pump.hero.title': 'जल उपसा प्रणाली',
    'pump.hero.sub':   'सौर-चालित जल वितरण व्यवस्थापन',
    'pump.tank.title': '💧 टाकी स्थिती',
    'pump.controls.title': '⚙ पंप नियंत्रण',
    'pump.status':  'स्थिती',
    'pump.flow':    'प्रवाह दर',
    'pump.power':   'वीज वापर',
    'pump.runtime': 'आजचा चालू वेळ',
    'pump.start':   '▶ पंप सुरू करा',
    'pump.stop':    '■ पंप थांबवा',
    'pump.active':  'सक्रिय',
    'pump.volume':  'मात्रा',
    'pump.eta':     'भरण्याचा अंदाज',

    /* GRID TAB */
    'grid.hero.title': 'ग्रिड मॉनिटर',
    'grid.hero.sub':   'ग्रिड कनेक्टिव्हिटी, व्होल्टेज आणि खंडण्याचा इतिहास',
    'grid.status.label': 'ग्रिड स्थिती',
    'grid.status.val': 'जोडलेले',
    'grid.status.sub': 'स्थिर — 230V',
    'grid.outages.label': 'या महिन्यात खंडणे',
    'grid.outages.sub': 'एकूण: 4.2 तास गेले',
    'grid.uptime.label': 'ग्रिड अपटाइम',
    'grid.uptime.sub': 'मागील 30 दिवस',
    'grid.last.label': 'शेवटची खंडणे',
    'grid.last.val': '2 दिवसांपूर्वी',
    'grid.last.sub': 'कालावधी: 1.5 तास',

    /* REPORTS TAB */
    'reports.hero.title': 'अहवाल आणि विश्लेषण',
    'reports.hero.sub': 'ऐतिहासिक ऊर्जा आणि जल डेटा डाउनलोड करा',
    'reports.section': '📄 उपलब्ध अहवाल',
    'reports.new':     '+ नवीन अहवाल तयार करा',
    'reports.r1.title': 'मासिक ऊर्जा सारांश — मार्च 2026',
    'reports.r1.sub':   'सौर निर्मिती, बॅटरी वापर, ग्रिड घटना',
    'reports.r2.title': 'जल उपसा नोंद — मार्च 2026',
    'reports.r2.sub':   'दैनिक पंप तास, उपसलेले पाणी, कार्यक्षमता',
    'reports.r3.title': 'ग्रिड खंडण अहवाल — Q1 2026',
    'reports.r3.sub':   'खंडण घटना, कालावधी, स्विचओव्हर यश दर',
    'reports.download': '⬇ PDF डाउनलोड',

    /* ABOUT TAB */
    'about.hero.title': 'सूर्य-संचय बद्दल',
    'about.hero.sub':  'स्वच्छ सौर ऊर्जेतून ग्रामीण भारताला सशक्त करणे',
    'about.desc': 'सूर्य-संचय हे डिजिटल इंडिया उपक्रमांतर्गत विकसित केलेले स्मार्ट सौर ऊर्जा व्यवस्थापन प्लॅटफॉर्म आहे, जे ग्रामीण गावांना विश्वसनीय सौर ऊर्जा निरीक्षण, जल पंप व्यवस्थापन आणि ग्रिड लवचिकता साधनांसह सशक्त करण्याच्या उद्देशाने आहे.',
    'about.solar.title': 'सौर निरीक्षण',
    'about.solar.desc':  'सौर पॅनेल आउटपुट आणि कार्यक्षमतेचे रिअल-टाइम ट्रॅकिंग',
    'about.water.title': 'जल व्यवस्थापन',
    'about.water.desc':  'सौर-चालित पाणी उपसासाठी स्मार्ट वेळापत्रक',
    'about.grid.title':  'ग्रिड एकत्रीकरण',
    'about.grid.desc':   'अखंड वीजेसाठी सौर-ग्रिड हायब्रिड',
    'about.analytics.title': 'विश्लेषण',
    'about.analytics.desc':  'ऊर्जा कार्यक्षमता आणि बचतीसाठी डेटा-आधारित अंतर्दृष्टी',

    /* FOOTER */
    'footer.tagline': 'ग्रामीण भारतासाठी स्मार्ट सौर व्यवस्थापन',
    'footer.govt':    'शासकीय पोर्टल',
    'footer.mnre':    'नवीन आणि नवीकरणीय ऊर्जा मंत्रालय',
    'footer.digital': 'डिजिटल इंडिया',
    'footer.mygov':   'माय गव्ह इंडिया',
    'footer.kusum':   'पीएम-कुसुम योजना',
    'footer.quick':   'द्रुत दुवे',
    'footer.manual':  'वापरकर्ता मार्गदर्शिका',
    'footer.videos':  'प्रशिक्षण व्हिडिओ',
    'footer.faq':     'वारंवार विचारले जाणारे प्रश्न',
    'footer.updates': 'सिस्टम अद्यतने',
    'footer.contact': 'संपर्क आणि सहाय्य',
    'footer.copy':    '© 2026 सूर्य-संचय | भारत सरकार उपक्रम | सर्व हक्क राखीव',

    /* MODALS */
    'modal.pump.title':   'जल पंप सुरू करा',
    'modal.pump.desc':    'पुढील नियोजित सत्रासाठी सौर जल पंप सुरू करायचा?',
    'modal.pump.solar':   'सध्याचे सौर आउटपुट:',
    'modal.pump.req':     'पंपसाठी आवश्यक वीज:',
    'modal.pump.tank':    'टाकी पातळी:',
    'modal.pump.cancel':  'रद्द करा',
    'modal.pump.confirm': '✓ पुष्टी करा',
    'modal.sched.title':  'आजचे वेळापत्रक',
    'modal.sched.sunrise': '🌅 सूर्योदय / सौर सुरुवात',
    'modal.sched.pump1':  '💧 पंप सत्र 1',
    'modal.sched.golden': '⚡ सुवर्ण तास (शिखर)',
    'modal.sched.pump2':  '💧 पंप सत्र 2',
    'modal.sched.battery':'🌙 बॅटरी चार्जिंग',
    'modal.close':        'बंद करा',

    /* PANEL */
    'panel.notif': 'सूचना',
    'panel.n1': 'सौर निर्मिती शिखरावर — 8.2 kW आउटपुट',
    'panel.n2': 'बॅटरी 72% — मध्यम वापर',
    'panel.n3': 'पाणी उपसणे पूर्ण — आज 4,500 L',
    'panel.n4': 'ग्रिड बंद — सौर स्विचओव्हर यशस्वी',

    /* TOAST */
    'toast.pump':    '✓ जल पंप यशस्वीरित्या सुरू!',
    'toast.report':  '📄 PDF अहवाल तयार होत आहे...',
    'toast.cleared': 'सर्व सूचना हटवल्या',
  }
};

// Expose globally
window.TRANSLATIONS = TRANSLATIONS;
