import { Leaf, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-[#5C4033] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* SDG Goals Section */}
        <div className="mb-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#E6A817]" />
              <span className="text-sm">SDG Goal 7: Affordable & Clean Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#E6A817]" />
              <span className="text-sm">SDG Goal 8: Decent Work & Economic Growth</span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2">Ministry Links</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">Ministry of New and Renewable Energy</a></li>
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">Ministry of Panchayati Raj</a></li>
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">PM-KUSUM Scheme</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Government Portals</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">Digital India</a></li>
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">MyGov</a></li>
              <li><a href="#" className="hover:text-[#E6A817] transition-colors">India.gov.in</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@suryasanchay.gov.in" className="hover:text-[#E6A817] transition-colors">
                  info@suryasanchay.gov.in
                </a>
              </li>
              <li>Gadheshwar Gram Panchayat</li>
              <li>Maharashtra, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="text-sm text-white/80 mb-2">
            Powered by Satellite Data & Community Action
          </p>
          <p className="text-xs text-white/60">
            © 2026 Surya-Sanchay. A Smart Solar Management Initiative for Rural India.
          </p>
        </div>
      </div>
    </footer>
  );
}
