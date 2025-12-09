import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  FileText,
  Video,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I add a new credential?',
    answer:
      'Click the "Add Credential" button on your dashboard or credentials page. Fill in the required information including the credential name, type, expiry date, and optionally upload a document. Click "Save Credential" to add it to your vault.',
  },
  {
    question: 'When will I receive reminder notifications?',
    answer:
      'By default, you\'ll receive email reminders at 90, 60, 30, 7, and 1 day before your credential expires. Pro users can also enable SMS reminders. You can customize your reminder schedule in Settings > Notifications.',
  },
  {
    question: 'How do I upload documents?',
    answer:
      'When adding or editing a credential, you can upload supporting documents (PDF, JPG, PNG up to 10MB). Simply drag and drop the file or click to browse. Documents are encrypted and stored securely in your credential vault.',
  },
  {
    question: 'Can I export my credentials?',
    answer:
      'Yes! Pro and Team plan users can export their credentials as CSV files. Go to My Credentials, click the export button, and choose your preferred format. You can also generate PDF compliance reports.',
  },
  {
    question: 'How do I upgrade my plan?',
    answer:
      'Go to Settings > Billing to view available plans and upgrade. Pro plan is $9.99/month and includes unlimited credentials, SMS reminders, and advanced analytics. Team plan is $299/month for organizations.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use bank-level encryption (AES-256) for all stored documents and data. All connections are secured with TLS 1.3. We never share your data with third parties and comply with HIPAA and GDPR requirements.',
  },
  {
    question: 'Can I share credentials with my team?',
    answer:
      'Team plan users can invite team members and share credentials within their organization. Admins can assign credentials to specific team members and generate compliance reports for the entire team.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel your subscription anytime from Settings > Billing. Your account will remain active until the end of your billing period. You can also downgrade to the free plan to keep your data.',
  },
];

const resources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Detailed guides and tutorials',
    link: '#',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    link: '#',
  },
  {
    icon: FileText,
    title: 'API Reference',
    description: 'For developers and integrations',
    link: '#',
  },
];

export function HelpPage() {
  return (
    <ModernDashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-[#0066FF]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">How can we help?</h1>
          <p className="text-gray-400 mt-2">
            Search our knowledge base or browse frequently asked questions
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for help..."
            className="pl-12 h-12 text-lg rounded-xl"
          />
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#0066FF] hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <resource.icon className="w-6 h-6 text-[#0066FF]" />
              </div>
              <div>
                <p className="font-medium text-white">{resource.title}</p>
                <p className="text-sm text-gray-400">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
            </a>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-lg px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium text-white">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-blue-100 mb-6">
            Our support team is here to assist you with any questions
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              className="bg-white/5 text-[#0066FF] hover:bg-blue-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/5/10"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
}
