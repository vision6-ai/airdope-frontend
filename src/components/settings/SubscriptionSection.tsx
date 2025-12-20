import React from "react";

interface SubscriptionItem {
  id: string;
  name: string;
  detailsTitle: string;
  detailsSubtitle: string;
  price: number;
  isActive: boolean;
  isHighlighted?: boolean;
  icon?: React.ReactNode;
}

const subscriptionItems: SubscriptionItem[] = [
  {
    id: "marketing-automation",
    name: "Marketing Automation",
    detailsTitle: "500 contacts included",
    detailsSubtitle: "1/500 contacts used",
    price: 15,
    isActive: true,
  },
  {
    id: "inbox",
    name: "Inbox",
    detailsTitle: "Live Chat seats",
    detailsSubtitle: "1 Live Chat seat added",
    price: 99,
    isActive: false,
  },
];

function SubscriptionItemRow({ item }: { item: SubscriptionItem }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center p-5 border-b border-brand-gray-200/50 last:border-b-0">
      <div className="col-span-3 text-sm font-semibold text-white">{item.name}</div>
      <div className="col-span-3">
        <div className="flex items-center text-sm text-gray-300">
          {item.detailsTitle}
          <i className="fa-regular fa-circle-question text-brand-gray-100 ml-2"></i>
        </div>
        <div className="text-xs text-brand-gray-100 mt-1">{item.detailsSubtitle}</div>
      </div>
      <div className="col-span-2 text-right text-sm font-semibold text-white">
        ${item.price}
        <span className="text-brand-gray-100 font-normal">/month</span>
      </div>
      <div className="col-span-2 flex justify-center">
        {item.isActive ? (
          <span className="bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full border border-green-500/30">
            Active
          </span>
        ) : (
          <span className="bg-brand-gray-200/50 text-brand-gray-100 text-xs font-medium px-3 py-1.5 rounded-full border border-brand-gray-200/50">
            Disabled
          </span>
        )}
      </div>
      <div className="col-span-2 flex justify-center">
        <button className="bg-brand-gray-300 hover:bg-brand-gray-200 border border-brand-gray-200/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          {item.isActive ? "Disable" : "Activate"}
        </button>
      </div>
    </div>
  );
}

function AIProductCard() {
  return (
    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl mt-6 grid grid-cols-12 gap-4 items-center p-5">
      <div className="col-span-3 flex items-center space-x-3">
        <div className="bg-white text-brand-dark w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg">
          AI
        </div>
        <span className="text-sm font-semibold text-white">AirDope AI</span>
      </div>
      <div className="col-span-3 text-sm text-gray-300">AI Automations and Conversations</div>
      <div className="col-span-2 text-right text-sm font-semibold text-white">
        $29<span className="text-brand-gray-100 font-normal">/month</span>
      </div>
      <div className="col-span-2 flex justify-center">
        <span className="bg-brand-gray-200/50 text-brand-gray-100 text-xs font-medium px-3 py-1.5 rounded-full border border-brand-gray-200/50">
          Disabled
        </span>
      </div>
      <div className="col-span-2 flex justify-center">
        <button className="bg-white hover:bg-gray-100 text-brand-dark text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
          Activate
        </button>
      </div>
    </div>
  );
}

export function SubscriptionSection() {
  const totalPrice = subscriptionItems
    .filter((item) => item.isActive)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="flex-1 bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-8">
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-white">Subscription</h2>
          <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-lg border border-purple-500/30">
            PRO
          </span>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Features And Pricing
        </a>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-4 py-4 text-xs text-brand-gray-100 uppercase tracking-wider">
          <div className="col-span-3">Product</div>
          <div className="col-span-3">Details</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        <div className="bg-brand-gray-300/50 border border-brand-gray-200/50 rounded-xl overflow-hidden">
          {subscriptionItems.map((item) => (
            <SubscriptionItemRow key={item.id} item={item} />
          ))}
        </div>

        <AIProductCard />
      </div>

      <footer className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
        <div className="text-sm">
          <span className="text-brand-gray-100">Total monthly price:</span>
          <span className="font-bold text-white ml-2 text-lg">${totalPrice}</span>
        </div>
        <button className="bg-brand-gray-300 hover:bg-brand-gray-200 border border-brand-gray-200/50 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors">
          Cancel Subscription
        </button>
      </footer>
    </section>
  );
}
