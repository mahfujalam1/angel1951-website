'use client'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PRIVACY_POLICY_HTML = `
<div class="prose prose-sm max-w-none">
  <p class="text-gray-700 mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquid ex ea commodo consequat.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">What Personal Information Do We Collect From The People That Visit Our Website Or Blog?</h2>
  <p class="text-gray-700 mb-4">
    When you visit our website, you may provide us with two types of information: personal information you voluntarily choose to disclose that is collected on an individual, non-aggregate basis, and Web Site use information collected on an aggregate basis as you and others browse our Web Site.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">When Do We Collect Information?</h2>
  <p class="text-gray-700 mb-4">
    We collect information from you when you subscribe to a newsletter, respond to a survey or fill out a form. Information collected will include your email address, which may be used to keep you informed of the latest product updates, promotional material from our partners or other information we think you would find of interest. Any information provided will be kept strictly confidential.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">How Do We Use Your Information?</h2>
  <p class="text-gray-700 mb-4">
    We may use the information we collect from you when you register, subscribe to our newsletter, respond to a survey or marketing communication, surf the website or use certain other site features in the following ways:
  </p>
  <ul class="list-disc list-inside mb-4 text-gray-700">
    <li>To personalize your user experience and to allow us better serve you in addressing your individual needs</li>
    <li>To improve our website in order to better serve you</li>
    <li>To administer a contest, promotion, survey or other site feature</li>
    <li>To send periodic emails regarding your order or other products and services</li>
  </ul>

  <h2 class="text-xl font-bold mt-6 mb-3">How Do We Protect Your Information?</h2>
  <p class="text-gray-700 mb-4">
    We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These security measures include: password protected directories and databases to safeguard and secure all collected information, SSL (Secure Sockets Layer) technology to ensure that your personal information is fully encrypted and sent across the Internet securely, and PCI Compliance in order to ensure compliance with industry standards.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Do We Use Cookies?</h2>
  <p class="text-gray-700 mb-4">
    Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow). These cookies enable the site to recognize your browser and, if you have a registered account, associate it with your registered account. We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Do We Disclose Any Information To Outside Parties?</h2>
  <p class="text-gray-700 mb-4">
    We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Third Party Links</h2>
  <p class="text-gray-700 mb-4">
    Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">CAN SPAM Act Compliance</h2>
  <p class="text-gray-700 mb-4">
    We collect your email address in order to send related account information and order confirmations. To be in accordance with CANSPAM, we agree to the following: (1) not use false or misleading subjects or email addresses; (2) identify the message as an advertisement in some reasonable way; (3) include the physical address of our business or site headquarters; (4) monitor third party email marketing services for compliance, if one is used; (5) honor opt-out/unsubscribe requests quickly; and (6) allow users to unsubscribe by using the link at the bottom of each email.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Contacting Us</h2>
  <p class="text-gray-700 mb-4">
    If there are any questions regarding this privacy policy, you may contact us using the information below: Email: privacy@example.com
  </p>
</div>
`

export default function PrivacyPolicy() {

    const router = useRouter()

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <div className='flex gap-2 items-center'>
                        <button
                            onClick={() => router.back()}
                            className="text-gray-500 hover:text-gray-800 transition"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    </div>
                    <p className="text-gray-600 ms-7">Last updated: January 2024</p>
                </div>

                <Card className="p-8 bg-white">
                    <div
                        dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY_HTML }}
                        className="text-gray-800 space-y-4"
                    />
                </Card>
            </div>
        </main>
    )
}
