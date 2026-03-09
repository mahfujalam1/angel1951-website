'use client'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TERMS_CONDITIONS_HTML = `
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
    We collect information from you when you subscribe to a newsletter, respond to a survey or fill out a form. Any information provided will be kept strictly confidential.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Agreement to Terms</h2>
  <p class="text-gray-700 mb-4">
    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Use License</h2>
  <p class="text-gray-700 mb-4">
    Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
  </p>
  <ul class="list-disc list-inside mb-4 text-gray-700">
    <li>Modifying or copying the materials</li>
    <li>Using the materials for any commercial purpose or for any public display</li>
    <li>Attempting to decompile or reverse engineer any software contained on the website</li>
    <li>Removing any copyright or other proprietary notations from the materials</li>
    <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
  </ul>

  <h2 class="text-xl font-bold mt-6 mb-3">Disclaimer</h2>
  <p class="text-gray-700 mb-4">
    The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Limitations</h2>
  <p class="text-gray-700 mb-4">
    In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Accuracy of Materials</h2>
  <p class="text-gray-700 mb-4">
    The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Links</h2>
  <p class="text-gray-700 mb-4">
    We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Modifications</h2>
  <p class="text-gray-700 mb-4">
    We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Governing Law</h2>
  <p class="text-gray-700 mb-4">
    These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
  </p>

  <h2 class="text-xl font-bold mt-6 mb-3">Contact Us</h2>
  <p class="text-gray-700 mb-4">
    If you have any questions about these terms and conditions, please contact us at: Email: support@example.com
  </p>
</div>
`

export default function TermsConditions() {

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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms &amp; Condition</h1>
                    </div>
                    <p className="text-gray-600 ms-7">Last updated: January 2024</p>
                </div>

                <Card className="p-8 bg-white">
                    <div
                        dangerouslySetInnerHTML={{ __html: TERMS_CONDITIONS_HTML }}
                        className="text-gray-800 space-y-4"
                    />
                </Card>
            </div>
        </main>
    )
}
