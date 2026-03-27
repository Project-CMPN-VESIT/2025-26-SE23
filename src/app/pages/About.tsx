import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { 
  CloudSun,
  Cpu,
  Calendar,
  Leaf,
  Users,
  Mail,
  HelpCircle,
  Shield,
  TrendingUp,
  Droplets,
  Zap,
  Sun
} from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  const howItWorksSteps = [
    {
      icon: CloudSun,
      title: t('about.step1'),
      description: 'We collect real-time solar irradiance data from NASA POWER API and local weather stations to predict energy generation.',
      color: 'text-[#E6A817]',
      bgColor: 'bg-[#E6A817]/10'
    },
    {
      icon: Cpu,
      title: t('about.step2'),
      description: 'Our AI algorithms analyze solar patterns, grid reliability, and water demand to create optimized schedules.',
      color: 'text-[#6B8E6B]',
      bgColor: 'bg-[#6B8E6B]/10'
    },
    {
      icon: Calendar,
      title: t('about.step3'),
      description: 'Automated pumping schedules are generated for peak solar hours, maximizing efficiency and reducing grid dependency.',
      color: 'text-[#4CAF50]',
      bgColor: 'bg-[#4CAF50]/10'
    },
  ];

  const impactStats = [
    { label: t('about.impact.villages'), value: '1', icon: Users, color: 'text-[#E6A817]' },
    { label: t('about.impact.energy'), value: '2,340 kWh', icon: Zap, color: 'text-[#4CAF50]' },
    { label: t('about.impact.water'), value: '450,000 L', icon: Droplets, color: 'text-[#6B8E6B]' },
    { label: t('about.impact.cost'), value: '₹18,720', icon: TrendingUp, color: 'text-[#C56A3D]' },
  ];

  const faqs = [
    {
      question: 'What is Surya-Sanchay?',
      answer: 'Surya-Sanchay is a Smart Solar Management Information System designed for Gram Panchayat administrators to optimize solar energy usage, particularly for water pumping during peak solar generation hours.'
    },
    {
      question: 'How does the Golden Hours system work?',
      answer: 'Golden Hours are the peak solar generation periods (typically 11 AM - 2 PM) when solar panels produce maximum energy. Our system automatically schedules water pumping during these hours to maximize solar usage and minimize grid dependency.'
    },
    {
      question: 'What data sources does Surya-Sanchay use?',
      answer: 'We primarily use NASA POWER API for satellite-based solar irradiance data, combined with local grid reliability data and historical weather patterns to generate accurate forecasts and schedules.'
    },
    {
      question: 'How accurate are the solar forecasts?',
      answer: 'Our forecasts have an average accuracy of 85-92%, depending on weather conditions. We continuously update predictions based on real-time data to maintain high reliability.'
    },
    {
      question: 'Can I override the automated schedule?',
      answer: 'Yes, administrators have manual override capabilities for emergency situations. However, we recommend following the automated schedule for optimal energy efficiency and cost savings.'
    },
    {
      question: 'How does this help with SDG goals?',
      answer: 'Surya-Sanchay directly contributes to SDG Goal 7 (Affordable and Clean Energy) by maximizing renewable energy usage, and SDG Goal 8 (Decent Work and Economic Growth) by reducing operational costs and improving agricultural productivity.'
    },
    {
      question: 'Is training provided for Gram Panchayat staff?',
      answer: 'Yes, we provide comprehensive training sessions for Gram Panchayat administrators, including video tutorials, user manuals in local languages, and ongoing support.'
    },
    {
      question: 'What reports can be generated?',
      answer: 'The system generates various reports including solar performance, water pumping efficiency, grid reliability, and government compliance reports for schemes like PM-KUSUM.'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-heading font-bold">{t('about.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="bg-[#E6A817] px-4 py-1">{t('about.badge.solar')}</Badge>
          <Badge className="bg-[#6B8E6B] px-4 py-1">{t('about.badge.ai')}</Badge>
          <Badge className="bg-[#4CAF50] px-4 py-1">{t('about.badge.gov')}</Badge>
        </div>
      </div>

      {/* How It Works */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold mb-2">{t('about.howItWorks')}</h2>
          <p className="text-muted-foreground">{t('about.howItWorksSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-8 space-y-4">
                  <div className={`mx-auto w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-lg font-semibold">
                      {t('about.step')} {index + 1}
                    </Badge>
                    <h3 className="text-xl font-heading font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Impact Statistics */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold mb-2">{t('about.impact')}</h2>
          <p className="text-muted-foreground">{t('about.impactSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6 text-center space-y-2">
                  <Icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SDG Goals */}
      <section>
        <Card className="bg-gradient-to-br from-[#E6A817]/10 to-[#6B8E6B]/10 border-[#E6A817]/30">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <Leaf className="h-12 w-12 text-[#4CAF50] mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-bold mb-2">{t('about.sdgTitle')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#E6A817]/20 p-3 rounded-lg">
                      <Sun className="h-6 w-6 text-[#E6A817]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('about.sdg7')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('about.sdg7.desc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#6B8E6B]/20 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-[#6B8E6B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('about.sdg8')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('about.sdg8.desc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <HelpCircle className="h-12 w-12 text-[#E6A817] mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold mb-2">{t('about.faq')}</h2>
          <p className="text-muted-foreground">{t('about.faqSubtitle')}</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Mail className="h-6 w-6 text-[#E6A817]" />
              {t('about.contact')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{t('about.contactTech')}</h3>
                <p className="text-sm text-muted-foreground mb-1">Email: support@suryasanchay.gov.in</p>
                <p className="text-sm text-muted-foreground">Phone: 1800-XXX-XXXX (Toll Free)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('about.contactAdmin')}</h3>
                <p className="text-sm text-muted-foreground mb-1">Gadheshwar Gram Panchayat</p>
                <p className="text-sm text-muted-foreground">Maharashtra, India</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-[#4CAF50]" />
                <h3 className="font-semibold">{t('about.contactPrivacy')}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('about.contactPrivacyDesc')}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#E6A817] hover:bg-[#d09815]" onClick={() => window.location.href = 'mailto:support@suryasanchay.gov.in'}>
                <Mail className="mr-2 h-4 w-4" />
                {t('about.btn.contact')}
              </Button>
              <Button variant="outline" onClick={() => window.open('https://docs.suryasanchay.gov.in', '_blank')}>
                <HelpCircle className="mr-2 h-4 w-4" />
                {t('about.btn.docs')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Powered By Section */}
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground italic">
          {t('about.poweredBy')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-sm">{t('about.tags.api')}</Badge>
          <Badge variant="outline" className="text-sm">{t('about.tags.ai')}</Badge>
          <Badge variant="outline" className="text-sm">{t('about.tags.monitor')}</Badge>
          <Badge variant="outline" className="text-sm">{t('about.tags.feedback')}</Badge>
        </div>
      </div>
    </div>
  );
}