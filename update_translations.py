import sys
import re

file_path = "c:/Users/Apurva/SuryaSanchay/src/app/contexts/LanguageContext.tsx"

new_en = {
    'reports.subtitle': 'Generate and download official compliance reports',
    'reports.filterTitle': 'Filter Reports',
    'reports.previewTitle': 'Report Preview',
    'reports.graphTitle': 'Graphical Representation',
    'reports.cat.solar.title': 'Solar Performance Report',
    'reports.cat.solar.desc': 'Detailed analysis of solar panel efficiency and generation',
    'reports.cat.pumping.title': 'Water Pumping Report',
    'reports.cat.pumping.desc': 'Water usage, pumping schedule compliance, and optimization',
    'reports.cat.grid.title': 'Grid Reliability Report',
    'reports.cat.grid.desc': 'Outage patterns, voltage quality, and grid performance',
    'reports.cat.compliance.title': 'Compliance Report',
    'reports.cat.compliance.desc': 'Government scheme compliance and SDG goal tracking',
    'reports.period': 'Period:',
    'reports.keyMetrics': 'Key Metrics',
    'reports.metric.gen': 'Total Generation',
    'reports.metric.peak': 'Peak Power',
    'reports.metric.eff': 'Efficiency',
    'reports.metric.golden': 'Golden Hours',
    'reports.metric.water': 'Total Water Pumped',
    'reports.metric.sessions': 'Pumping Sessions',
    'reports.metric.energy': 'Energy Used',
    'reports.metric.compliance': 'Schedule Compliance',
    'reports.metric.uptime': 'Grid Uptime',
    'reports.metric.outages': 'Total Outages',
    'reports.metric.avgVolt': 'Avg Voltage',
    'reports.metric.downtime': 'Downtime Hours',
    'reports.metric.sdg7': 'SDG 7 Score',
    'reports.metric.sdg8': 'SDG 8 Score',
    'reports.metric.kusum': 'PM-KUSUM Compliance',
    'reports.metric.savings': 'Cost Savings',
    'reports.col.date': 'Date Generated',
    'reports.col.type': 'Report Type',
    'reports.col.period': 'Period',
    'reports.col.size': 'Size',
    'reports.col.status': 'Status',
    'reports.col.actions': 'Actions',
    'common.action': 'Action',
    'common.weekly': 'Weekly',
    'common.monthly': 'Monthly',
    'common.quarterly': 'Quarterly',
    'common.yearly': 'Yearly',
    'common.custom': 'Custom Date Range',
    'reports.period.weekly': 'Last 7 Days',
    'reports.period.monthly': 'Last 30 Days',
    'reports.period.quarterly': 'Last 3 Months',
    'reports.period.yearly': 'Last 12 Months',
    'reports.period.custom': 'Custom Range',
    'common.startDate': 'Start Date',
    'common.endDate': 'End Date',
    'common.lastMonth': 'Last Month'
}

new_hi = {
    'reports.subtitle': 'आधिकारिक अनुपालन रिपोर्ट बनाएं और डाउनलोड करें',
    'reports.filterTitle': 'रिपोर्ट फ़िल्टर करें',
    'reports.previewTitle': 'रिपोर्ट पूर्वावलोकन',
    'reports.graphTitle': 'ग्राफिकल प्रस्तुति',
    'reports.cat.solar.title': 'सौर प्रदर्शन रिपोर्ट',
    'reports.cat.solar.desc': 'सौर पैनल दक्षता और उत्पादन का विस्तृत विश्लेषण',
    'reports.cat.pumping.title': 'जल पंपिंग रिपोर्ट',
    'reports.cat.pumping.desc': 'जल उपयोग, पंपिंग अनुसूची अनुपालन, और अनुकूलन',
    'reports.cat.grid.title': 'ग्रिड विश्वसनीयता रिपोर्ट',
    'reports.cat.grid.desc': 'आउटेज पैटर्न, वोल्टेज गुणवत्ता, और ग्रिड प्रदर्शन',
    'reports.cat.compliance.title': 'अनुपालन रिपोर्ट',
    'reports.cat.compliance.desc': 'सरकारी योजना अनुपालन और SDG लक्ष्य ट्रैकिंग',
    'reports.period': 'अवधि:',
    'reports.keyMetrics': 'प्रमुख मेट्रिक्स',
    'reports.metric.gen': 'कुल उत्पादन',
    'reports.metric.peak': 'पीक पावर',
    'reports.metric.eff': 'दक्षता',
    'reports.metric.golden': 'स्वर्णिम घंटे',
    'reports.metric.water': 'कुल पंप किया गया पानी',
    'reports.metric.sessions': 'पंपिंग सत्र',
    'reports.metric.energy': 'उपयोग की गई ऊर्जा',
    'reports.metric.compliance': 'अनुसूची अनुपालन',
    'reports.metric.uptime': 'ग्रिड अपटाइम',
    'reports.metric.outages': 'कुल आउटेज',
    'reports.metric.avgVolt': 'औसत वोल्टेज',
    'reports.metric.downtime': 'डाउनटाइम घंटे',
    'reports.metric.sdg7': 'SDG 7 स्कोर',
    'reports.metric.sdg8': 'SDG 8 स्कोर',
    'reports.metric.kusum': 'PM-KUSUM अनुपालन',
    'reports.metric.savings': 'लागत बचत',
    'reports.col.date': 'उत्पन्न तिथि',
    'reports.col.type': 'रिपोर्ट प्रकार',
    'reports.col.period': 'अवधि',
    'reports.col.size': 'आकार',
    'reports.col.status': 'स्थिति',
    'reports.col.actions': 'कार्रवाई',
    'common.action': 'कार्रवाई',
    'common.weekly': 'साप्ताहिक',
    'common.monthly': 'मासिक',
    'common.quarterly': 'त्रैमासिक',
    'common.yearly': 'वार्षिक',
    'common.custom': 'कस्टम तिथि सीमा',
    'reports.period.weekly': 'पिछले 7 दिन',
    'reports.period.monthly': 'पिछले 30 दिन',
    'reports.period.quarterly': 'पिछले 3 महीने',
    'reports.period.yearly': 'पिछले 12 महीने',
    'reports.period.custom': 'कस्टम सीमा',
    'common.startDate': 'प्रारंभ तिथि',
    'common.endDate': 'समाप्ति तिथि',
    'common.lastMonth': 'पिछले महीने'
}

new_mr = {
    'reports.subtitle': 'अधिकृत अनुपालन अहवाल तयार करा आणि डाउनलोड करा',
    'reports.filterTitle': 'अहवाल फिल्टर करा',
    'reports.previewTitle': 'अहवाल पूर्वावलोकन',
    'reports.graphTitle': 'ग्राफिकल सादरीकरण',
    'reports.cat.solar.title': 'सौर कामगिरी अहवाल',
    'reports.cat.solar.desc': 'सौर पॅनेल कार्यक्षमता आणि उत्पादनाचे सविस्तर विश्लेषण',
    'reports.cat.pumping.title': 'पाणी पंपिंग अहवाल',
    'reports.cat.pumping.desc': 'पाण्याचा वापर, पंपिंग वेळापत्रक अनुपालन आणि ऑप्टिमायझेशन',
    'reports.cat.grid.title': 'ग्रिड विश्वासार्हता अहवाल',
    'reports.cat.grid.desc': 'आउटेज पॅटर्न, व्होल्टेज गुणवत्ता आणि ग्रिड कामगिरी',
    'reports.cat.compliance.title': 'अनुपालन अहवाल',
    'reports.cat.compliance.desc': 'सरकारी योजना अनुपालन आणि SDG ध्येय ट्रॅकिंग',
    'reports.period': 'कालावधी:',
    'reports.keyMetrics': 'प्रमुख मेट्रिक्स',
    'reports.metric.gen': 'एकूण उत्पादन',
    'reports.metric.peak': 'पीक पॉवर',
    'reports.metric.eff': 'कार्यक्षमता',
    'reports.metric.golden': 'सुवर्ण तास',
    'reports.metric.water': 'एकूण पंप केलेले पाणी',
    'reports.metric.sessions': 'पंपिंग सत्रे',
    'reports.metric.energy': 'वापरलेली ऊर्जा',
    'reports.metric.compliance': 'वेळापत्रक अनुपालन',
    'reports.metric.uptime': 'ग्रिड अपटाइम',
    'reports.metric.outages': 'एकूण आउटेज',
    'reports.metric.avgVolt': 'सरासरी व्होल्टेज',
    'reports.metric.downtime': 'डाउनटाइम तास',
    'reports.metric.sdg7': 'SDG 7 स्कोअर',
    'reports.metric.sdg8': 'SDG 8 स्कोअर',
    'reports.metric.kusum': 'PM-KUSUM अनुपालन',
    'reports.metric.savings': 'खर्च बचत',
    'reports.col.date': 'तयार केलेली तारीख',
    'reports.col.type': 'अहवाल प्रकार',
    'reports.col.period': 'कालावधी',
    'reports.col.size': 'आकार',
    'reports.col.status': 'स्थिती',
    'reports.col.actions': 'कृती',
    'common.action': 'कृती',
    'common.weekly': 'साप्ताहिक',
    'common.monthly': 'मासिक',
    'common.quarterly': 'त्रैमासिक',
    'common.yearly': 'वार्षिक',
    'common.custom': 'सानुकूल तारीख श्रेणी',
    'reports.period.weekly': 'मागील 7 दिवस',
    'reports.period.monthly': 'मागील 30 दिवस',
    'reports.period.quarterly': 'मागील 3 महिने',
    'reports.period.yearly': 'मागील 12 महिने',
    'reports.period.custom': 'सानुकूल श्रेणी',
    'common.startDate': 'सुरुवात तारीख',
    'common.endDate': 'शेवटची तारीख',
    'common.lastMonth': 'मागील महिना'
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def insert_dict(lang, new_dict, content):
    dict_str = ""
    for k, v in new_dict.items():
        dict_str += f"    '{k}': '{v}',\n"
    
    # find the end of the lang dict
    pattern = re.compile(rf"  {lang}: {{(.*?)^\s*}},", re.DOTALL | re.MULTILINE)
    match = pattern.search(content)
    if match:
        inner = match.group(1)
        # insert before the end
        if not inner.endswith("\n"):
            dict_str = "\n" + dict_str
        new_inner = inner + dict_str
        content = content[:match.start(1)] + new_inner + content[match.end(1):]
    return content

content = insert_dict("en", new_en, content)
content = insert_dict("hi", new_hi, content)
content = insert_dict("mr", new_mr, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated LanguageContext.tsx")
