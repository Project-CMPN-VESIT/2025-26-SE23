/* =========================================================
   Surya-Sanchay – pdf-report.js
   PDF generation using jsPDF + autotable
   Supports English, Hindi, Marathi
   ========================================================= */

'use strict';

const PDF_REPORTS = {
  energy: {
    en: {
      title: 'Monthly Energy Summary — March 2026',
      subtitle: 'Surya-Sanchay Smart Solar Management System',
      village: 'Village: Rampur, Chitrakoot, UP',
      sections: [
        {
          heading: 'Solar Generation Summary',
          headers: ['Metric', 'Value', 'Status'],
          rows: [
            ['Solar Hours Today', '6.5 hrs', '✓ Good'],
            ['Peak Generation Period', '11:00 AM – 2:00 PM', '✓ Active'],
            ['Today\'s Total Output', '42.6 kWh', '✓ Above Target'],
            ['Panel Efficiency', '94.2%', '✓ Excellent'],
            ['Current Solar Output', '7.8 kW', '✓ Live'],
            ['Monthly Solar Income', '₹2,340 saved', '✓ Target Met'],
          ]
        },
        {
          heading: 'Battery & Storage',
          headers: ['Parameter', 'Value', 'Remarks'],
          rows: [
            ['Battery Charge Level', '72%', 'Healthy'],
            ['Stored Energy', '18 kWh', 'Sufficient'],
            ['Average Daily Cycle', '1.2 cycles', 'Normal'],
            ['Battery Health', '96%', 'Excellent'],
          ]
        },
        {
          heading: 'Monthly Overview',
          headers: ['Date Range', 'Generation (kWh)', 'Savings (₹)'],
          rows: [
            ['March 1–7, 2026',  '285 kWh', '₹570'],
            ['March 8–14, 2026', '302 kWh', '₹604'],
            ['March 15–21, 2026','298 kWh', '₹596'],
            ['March 22–31, 2026','290 kWh', '₹580'],
            ['Total', '1,175 kWh', '₹2,350'],
          ]
        }
      ]
    },
    hi: {
      title: 'मासिक ऊर्जा सारांश — मार्च 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर प्रबंधन प्रणाली',
      village: 'गाँव: रामपुर, चित्रकूट, उत्तर प्रदेश',
      sections: [
        {
          heading: 'सौर उत्पादन सारांश',
          headers: ['मापदंड', 'मूल्य', 'स्थिति'],
          rows: [
            ['आज के सौर घंटे', '6.5 घंटे', '✓ अच्छा'],
            ['अधिकतम उत्पादन समय', 'सुबह 11 – दोपहर 2', '✓ सक्रिय'],
            ['आज का कुल उत्पादन', '42.6 kWh', '✓ लक्ष्य से अधिक'],
            ['पैनल दक्षता', '94.2%', '✓ उत्कृष्ट'],
            ['वर्तमान सौर आउटपुट', '7.8 kW', '✓ लाइव'],
            ['मासिक बचत', '₹2,340', '✓ लक्ष्य पूरा'],
          ]
        },
        {
          heading: 'बैटरी और भंडारण',
          headers: ['पैरामीटर', 'मूल्य', 'टिप्पणी'],
          rows: [
            ['बैटरी चार्ज स्तर', '72%', 'स्वस्थ'],
            ['संग्रहीत ऊर्जा', '18 kWh', 'पर्याप्त'],
            ['औसत दैनिक चक्र', '1.2 चक्र', 'सामान्य'],
            ['बैटरी स्वास्थ्य', '96%', 'उत्कृष्ट'],
          ]
        },
        {
          heading: 'मासिक सारांश',
          headers: ['तारीख', 'उत्पादन (kWh)', 'बचत (₹)'],
          rows: [
            ['मार्च 1–7', '285 kWh', '₹570'],
            ['मार्च 8–14', '302 kWh', '₹604'],
            ['मार्च 15–21', '298 kWh', '₹596'],
            ['मार्च 22–31', '290 kWh', '₹580'],
            ['कुल', '1,175 kWh', '₹2,350'],
          ]
        }
      ]
    },
    mr: {
      title: 'मासिक ऊर्जा सारांश — मार्च 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर व्यवस्थापन प्रणाली',
      village: 'गाव: रामपूर, चित्रकूट, उत्तर प्रदेश',
      sections: [
        {
          heading: 'सौर निर्मिती सारांश',
          headers: ['मापदंड', 'मूल्य', 'स्थिती'],
          rows: [
            ['आजचे सौर तास', '6.5 तास', '✓ चांगले'],
            ['कमाल निर्मिती वेळ', 'सकाळी 11 – दुपारी 2', '✓ सक्रिय'],
            ['आजचे एकूण उत्पादन', '42.6 kWh', '✓ लक्ष्याहून अधिक'],
            ['पॅनेल कार्यक्षमता', '94.2%', '✓ उत्कृष्ट'],
            ['सध्याचे सौर आउटपुट', '7.8 kW', '✓ थेट'],
            ['मासिक बचत', '₹2,340', '✓ लक्ष्य पूर्ण'],
          ]
        },
        {
          heading: 'बॅटरी आणि साठवण',
          headers: ['पॅरामीटर', 'मूल्य', 'टिप्पणी'],
          rows: [
            ['बॅटरी चार्ज पातळी', '72%', 'निरोगी'],
            ['साठवलेली ऊर्जा', '18 kWh', 'पुरेसे'],
            ['सरासरी दैनिक चक्र', '1.2 चक्र', 'सामान्य'],
            ['बॅटरी आरोग्य', '96%', 'उत्कृष्ट'],
          ]
        },
        {
          heading: 'मासिक आढावा',
          headers: ['तारीख', 'निर्मिती (kWh)', 'बचत (₹)'],
          rows: [
            ['मार्च 1–7', '285 kWh', '₹570'],
            ['मार्च 8–14', '302 kWh', '₹604'],
            ['मार्च 15–21', '298 kWh', '₹596'],
            ['मार्च 22–31', '290 kWh', '₹580'],
            ['एकूण', '1,175 kWh', '₹2,350'],
          ]
        }
      ]
    }
  },

  water: {
    en: {
      title: 'Water Pumping Log — March 2026',
      subtitle: 'Surya-Sanchay Smart Solar Management System',
      village: 'Village: Rampur, Chitrakoot, UP',
      sections: [
        {
          heading: 'Today\'s Pump Statistics',
          headers: ['Parameter', 'Value', 'Status'],
          rows: [
            ['Water Pumped Today', '4,500 L', '✓ 85% of Target'],
            ['Pump Run Time', '10 hrs', '✓ Optimal'],
            ['Flow Rate', '450 L/hr', '✓ Normal'],
            ['Power Consumption', '2.1 kW', '✓ Efficient'],
            ['Tank Level', '68% (6,800 L)', '↑ Filling'],
            ['Target by Evening', '85% (8,500 L)', '⏳ On Track'],
          ]
        },
        {
          heading: 'Weekly Pumping Log',
          headers: ['Day', 'Volume (L)', 'Duration', 'Efficiency'],
          rows: [
            ['Monday',    '4,200 L', '9.3 hrs', '94%'],
            ['Tuesday',   '3,800 L', '8.4 hrs', '91%'],
            ['Wednesday', '4,600 L', '10.2 hrs','96%'],
            ['Thursday',  '4,500 L', '10.0 hrs','95%'],
            ['Friday',    '4,400 L', '9.8 hrs', '94%'],
            ['Saturday',  '3,200 L', '7.1 hrs', '89%'],
            ['Sunday',    '2,800 L', '6.2 hrs', '87%'],
            ['Total',     '27,500 L','61.0 hrs', '93% avg'],
          ]
        }
      ]
    },
    hi: {
      title: 'जल पंपिंग लॉग — मार्च 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर प्रबंधन प्रणाली',
      village: 'गाँव: रामपुर, चित्रकूट, यूपी',
      sections: [
        {
          heading: 'आज का पंप सांख्यिकी',
          headers: ['मापदंड', 'मूल्य', 'स्थिति'],
          rows: [
            ['आज पानी पंप किया', '4,500 L', '✓ लक्ष्य का 85%'],
            ['पंप चलने का समय', '10 घंटे', '✓ इष्टतम'],
            ['प्रवाह दर', '450 L/घंटा', '✓ सामान्य'],
            ['बिजली खपत', '2.1 kW', '✓ दक्ष'],
            ['टंकी स्तर', '68% (6,800 L)', '↑ भर रहा है'],
            ['शाम तक लक्ष्य', '85% (8,500 L)', '⏳ समय पर'],
          ]
        },
        {
          heading: 'साप्ताहिक पंपिंग लॉग',
          headers: ['दिन', 'मात्रा (L)', 'अवधि', 'दक्षता'],
          rows: [
            ['सोमवार',   '4,200 L', '9.3 घंटे', '94%'],
            ['मंगलवार',  '3,800 L', '8.4 घंटे', '91%'],
            ['बुधवार',   '4,600 L', '10.2 घंटे','96%'],
            ['गुरुवार',  '4,500 L', '10.0 घंटे','95%'],
            ['शुक्रवार', '4,400 L', '9.8 घंटे', '94%'],
            ['शनिवार',   '3,200 L', '7.1 घंटे', '89%'],
            ['रविवार',   '2,800 L', '6.2 घंटे', '87%'],
            ['कुल',      '27,500 L','61.0 घंटे', '93% औसत'],
          ]
        }
      ]
    },
    mr: {
      title: 'जल उपसा नोंद — मार्च 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर व्यवस्थापन प्रणाली',
      village: 'गाव: रामपूर, चित्रकूट, UP',
      sections: [
        {
          heading: 'आजची पंप आकडेवारी',
          headers: ['मापदंड', 'मूल्य', 'स्थिती'],
          rows: [
            ['आज उपसलेले पाणी', '4,500 L', '✓ लक्ष्याचे 85%'],
            ['पंप चालण्याचा वेळ', '10 तास', '✓ इष्टतम'],
            ['प्रवाह दर', '450 L/तास', '✓ सामान्य'],
            ['वीज वापर', '2.1 kW', '✓ कार्यक्षम'],
            ['टाकी पातळी', '68% (6,800 L)', '↑ भरत आहे'],
            ['संध्याकाळपर्यंत लक्ष्य', '85% (8,500 L)', '⏳ वेळेत'],
          ]
        },
        {
          heading: 'साप्ताहिक उपसा नोंद',
          headers: ['दिवस', 'मात्रा (L)', 'कालावधी', 'कार्यक्षमता'],
          rows: [
            ['सोमवार',  '4,200 L', '9.3 तास', '94%'],
            ['मंगळवार', '3,800 L', '8.4 तास', '91%'],
            ['बुधवार',  '4,600 L', '10.2 तास','96%'],
            ['गुरुवार', '4,500 L', '10.0 तास','95%'],
            ['शुक्रवार','4,400 L', '9.8 तास', '94%'],
            ['शनिवार',  '3,200 L', '7.1 तास', '89%'],
            ['रविवार',  '2,800 L', '6.2 तास', '87%'],
            ['एकूण',    '27,500 L','61.0 तास', '93% सरासरी'],
          ]
        }
      ]
    }
  },

  grid: {
    en: {
      title: 'Grid Outage Report — Q1 2026',
      subtitle: 'Surya-Sanchay Smart Solar Management System',
      village: 'Village: Rampur, Chitrakoot, UP',
      sections: [
        {
          heading: 'Grid Summary',
          headers: ['Parameter', 'Value', 'Status'],
          rows: [
            ['Grid Status', 'Connected', '✓ Stable'],
            ['Voltage', '230V', '✓ Normal'],
            ['Frequency', '50 Hz', '✓ Stable'],
            ['Uptime (30 days)', '94.8%', '✓ Good'],
            ['Outages This Month', '3', '⚠ Moderate'],
            ['Total Downtime', '4.2 hrs', '⚠ Monitor'],
            ['Solar Switchover Success', '100%', '✓ Perfect'],
          ]
        },
        {
          heading: 'Outage Log — Q1 2026',
          headers: ['Date', 'Time', 'Duration', 'Cause', 'Action Taken'],
          rows: [
            ['Jan 12', '2:30 PM', '1.5 hrs', 'Line fault', 'Solar switchover'],
            ['Feb 3',  '6:15 AM', '0.7 hrs', 'Overload',   'Load shedding'],
            ['Feb 19', '11:00 AM','0.8 hrs', 'Maintenance','Auto backup'],
            ['Mar 20', '4:00 PM', '1.2 hrs', 'Storm',      'Solar + battery'],
          ]
        }
      ]
    },
    hi: {
      title: 'ग्रिड आउटेज रिपोर्ट — Q1 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर प्रबंधन प्रणाली',
      village: 'गाँव: रामपुर, चित्रकूट, यूपी',
      sections: [
        {
          heading: 'ग्रिड सारांश',
          headers: ['मापदंड', 'मूल्य', 'स्थिति'],
          rows: [
            ['ग्रिड स्थिति', 'जुड़ा हुआ', '✓ स्थिर'],
            ['वोल्टेज', '230V', '✓ सामान्य'],
            ['आवृत्ति', '50 Hz', '✓ स्थिर'],
            ['अपटाइम (30 दिन)', '94.8%', '✓ अच्छा'],
            ['इस महीने आउटेज', '3', '⚠ मध्यम'],
            ['कुल डाउनटाइम', '4.2 घंटे', '⚠ निगरानी'],
            ['सौर स्विचओवर सफलता', '100%', '✓ उत्तम'],
          ]
        },
        {
          heading: 'आउटेज लॉग — Q1 2026',
          headers: ['तारीख', 'समय', 'अवधि', 'कारण', 'कार्रवाई'],
          rows: [
            ['जनवरी 12', 'दोपहर 2:30', '1.5 घंटे', 'लाइन दोष',   'सौर स्विचओवर'],
            ['फरवरी 3',  'सुबह 6:15',  '0.7 घंटे', 'ओवरलोड',    'लोड शेडिंग'],
            ['फरवरी 19', 'सुबह 11:00', '0.8 घंटे', 'रखरखाव',    'ऑटो बैकअप'],
            ['मार्च 20', 'शाम 4:00',   '1.2 घंटे', 'तूफान',      'सौर + बैटरी'],
          ]
        }
      ]
    },
    mr: {
      title: 'ग्रिड खंडण अहवाल — Q1 2026',
      subtitle: 'सूर्य-संचय स्मार्ट सौर व्यवस्थापन प्रणाली',
      village: 'गाव: रामपूर, चित्रकूट, UP',
      sections: [
        {
          heading: 'ग्रिड सारांश',
          headers: ['मापदंड', 'मूल्य', 'स्थिती'],
          rows: [
            ['ग्रिड स्थिती', 'जोडलेले', '✓ स्थिर'],
            ['व्होल्टेज', '230V', '✓ सामान्य'],
            ['वारंवारता', '50 Hz', '✓ स्थिर'],
            ['अपटाइम (30 दिवस)', '94.8%', '✓ चांगले'],
            ['या महिन्यात खंडणे', '3', '⚠ मध्यम'],
            ['एकूण डाउनटाइम', '4.2 तास', '⚠ निरीक्षण'],
            ['सौर स्विचओव्हर यश', '100%', '✓ परिपूर्ण'],
          ]
        },
        {
          heading: 'खंडण नोंद — Q1 2026',
          headers: ['तारीख', 'वेळ', 'कालावधी', 'कारण', 'केलेली कृती'],
          rows: [
            ['जाने. 12', 'दु. 2:30', '1.5 तास', 'लाइन दोष',   'सौर स्विचओव्हर'],
            ['फेब्रु. 3', 'सका. 6:15',  '0.7 तास', 'ओव्हरलोड','लोड शेडिंग'],
            ['फेब्रु. 19','सका. 11:00', '0.8 तास', 'देखभाल',  'ऑटो बॅकअप'],
            ['मार्च 20', 'संध्या. 4:00','1.2 तास', 'वादळ',     'सौर + बॅटरी'],
          ]
        }
      ]
    }
  }
};

/* -------------------------------------------------------
   generatePDFReport(reportType, lang)
   reportType: 'energy' | 'water' | 'grid'
   lang: 'en' | 'hi' | 'mr'
------------------------------------------------------- */
function generatePDFReport(reportType, lang) {
  const data = PDF_REPORTS[reportType][lang] || PDF_REPORTS[reportType]['en'];
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const BRAND_YELLOW = [255, 184, 0];
  const BRAND_GREEN  = [52, 168, 83];
  const DARK_BG      = [29, 30, 43];
  const LIGHT_GRAY   = [245, 246, 249];
  const WHITE        = [255, 255, 255];
  const TEXT_DARK    = [26, 26, 46];
  const TEXT_GRAY    = [90, 97, 115];

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  /* ── Header Banner ── */
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, pageW, 42, 'F');

  // Brand sun icon (approximated as yellow circle + rays)
  doc.setFillColor(...BRAND_YELLOW);
  doc.circle(18, 21, 7, 'F');
  doc.setDrawColor(...BRAND_YELLOW);
  doc.setLineWidth(1.2);
  const rays = [[18,10,18,13],[18,29,18,32],[7,21,10,21],[26,21,29,21],[10,13,12,15],[24,27,26,29],[10,29,12,27],[24,15,26,13]];
  rays.forEach(([x1,y1,x2,y2]) => doc.line(x1,y1,x2,y2));

  // Title
  doc.setTextColor(...WHITE);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Surya-Sanchay', 30, 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_YELLOW);
  doc.text('Smart Solar Management System | Government of India', 30, 24);

  // SDG badges
  ['SDG 7', 'SDG 6', 'SDG 13'].forEach((badge, i) => {
    doc.setFillColor(...BRAND_YELLOW);
    doc.roundedRect(30 + i * 22, 28, 18, 7, 2, 2, 'F');
    doc.setTextColor(...DARK_BG);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text(badge, 30 + i * 22 + 9, 33.5, { align: 'center' });
  });

  // Report info on right
  doc.setTextColor(...TEXT_GRAY);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  const now = new Date();
  doc.text(`Generated: ${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`, pageW - 14, 20, { align: 'right' });
  doc.text(`Language: ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}`, pageW - 14, 26, { align: 'right' });

  let y = 50;

  /* ── Report Title ── */
  doc.setFillColor(...BRAND_GREEN);
  doc.rect(0, y - 4, 4, 22, 'F');

  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title, 10, y + 4);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_GRAY);
  doc.text(data.village, 10, y + 11);

  y += 26;

  /* ── Sections ── */
  data.sections.forEach((section, si) => {
    // Section heading
    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(10, y - 1, pageW - 20, 9, 'F');
    doc.setTextColor(...BRAND_GREEN);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(section.heading, 14, y + 5.5);
    y += 13;

    // Table
    doc.autoTable({
      startY: y,
      head: [section.headers],
      body: section.rows,
      margin: { left: 10, right: 10 },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [230, 232, 240],
        lineWidth: 0.3,
        textColor: TEXT_DARK,
        font: 'helvetica',
      },
      headStyles: {
        fillColor: DARK_BG,
        textColor: WHITE,
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: LIGHT_GRAY,
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 'auto' },
      },
      didParseCell(data) {
        // Color status cells
        if (data.section === 'body' && data.column.index === (section.headers.length - 1)) {
          const val = String(data.cell.raw);
          if (val.startsWith('✓'))      { data.cell.styles.textColor = BRAND_GREEN; data.cell.styles.fontStyle = 'bold'; }
          else if (val.startsWith('⚠')) { data.cell.styles.textColor = [230, 160, 0]; }
          else if (val.startsWith('↑')) { data.cell.styles.textColor = [0, 137, 123]; }
        }
        // Total rows bold
        if (data.section === 'body' && data.column.index === 0) {
          const val = String(data.cell.raw).toLowerCase();
          if (val === 'total' || val === 'कुल' || val === 'एकूण') {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [220, 240, 220];
          }
        }
      }
    });

    y = doc.lastAutoTable.finalY + 10;

    // Page break if needed
    if (y > pageH - 40 && si < data.sections.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  /* ── Footer ── */
  const addFooter = () => {
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(...DARK_BG);
      doc.rect(0, pageH - 14, pageW, 14, 'F');
      doc.setTextColor(144, 152, 168);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('Surya-Sanchay | Government of India | support@suryasanchay.gov.in | 1800-180-3333', pageW / 2, pageH - 5.5, { align: 'center' });
      doc.text(`Page ${i} of ${totalPages}`, pageW - 14, pageH - 5.5, { align: 'right' });
    }
  };

  addFooter();

  /* ── Save ── */
  const langSuffix = { en: 'EN', hi: 'HI', mr: 'MR' }[lang] || 'EN';
  const filename = `SuryaSanchay_${reportType}_report_${langSuffix}_${now.toISOString().slice(0,10)}.pdf`;
  doc.save(filename);
}

// Expose globally
window.generatePDFReport = generatePDFReport;
