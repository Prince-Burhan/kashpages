import { PLAN_DETAILS } from '../../utils/constants'
import Badge from '../../components/ui/Badge'

export default function PlanDetails() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(PLAN_DETAILS).map(([key, plan]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-primary mb-1">{plan.price}</p>
            <p className="text-gray-600 text-sm mb-6">{plan.period}</p>

            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <a href="mailto:burhan@kashpages.in?subject=Plan Inquiry - {plan.name}" className="block mt-6 w-full px-4 py-2 text-center bg-primary text-white rounded hover:bg-primary/80 transition">
              Contact Admin
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-2">How it Works</h3>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Choose a plan that suits your business</li>
          <li>Contact admin with your business details</li>
          <li>Admin creates and publishes your page</li>
          <li>Payment is processed manually</li>
          <li>Your page goes live with all features unlocked</li>
        </ol>
      </div>
    </div>
  )
}
