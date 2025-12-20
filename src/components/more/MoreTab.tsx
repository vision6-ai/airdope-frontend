import React, { useState } from "react";

export function MoreTab() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <CloneDropSection />
      <div className="border-t border-white/10" />
      <EventPageSection />
      <div className="border-t border-white/10" />
      <EmbedEventSection />
      <div className="border-t border-white/10" />
      <CancelEventSection />
    </div>
  );
}

function CloneDropSection() {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-2">Clone Drop</h2>
      <p className="text-brand-gray-100 text-sm mb-6">
        Create a new event with the same information as this one. Everything
        except the guest list and event blasts will be copied over.
      </p>
      <button className="bg-white hover:bg-gray-200 text-brand-dark font-semibold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
        <i className="fa-regular fa-clone" />
        <span>Clone Drop</span>
      </button>
    </section>
  );
}

function EventPageSection() {
  const [urlSlug, setUrlSlug] = useState("y9i1abt1");

  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-2">Event Page</h2>
      <p className="text-brand-gray-100 text-sm mb-6">
        When you choose a new URL, the current one will no longer work. Do not
        change your URL if you have already shared the event.
      </p>

      <div className="bg-brand-gray-300/80 border border-brand-gray-200/50 rounded-lg p-4 flex justify-between items-center mb-6">
        <p className="text-sm text-gray-300">
          Upgrade to AirDope Plus to set a custom URL for this event.
        </p>
        <button className="bg-brand-gray-200 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
          Learn More
        </button>
      </div>

      <div>
        <label
          htmlFor="public-url"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Public URL
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 h-10 rounded-l-md border border-r-0 border-brand-gray-200 bg-brand-gray-300 text-gray-400 text-sm">
            airdope.com
          </span>
          <input
            type="text"
            id="public-url"
            className="flex-1 block w-full h-10 rounded-none bg-brand-gray-400 border border-brand-gray-200 focus:ring-purple-500 focus:border-purple-500 text-white text-sm px-3 outline-none"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
          />
          <button className="h-10 px-5 rounded-r-md bg-brand-gray-200 hover:bg-white/20 text-white font-semibold text-sm transition-colors">
            Update
          </button>
        </div>
      </div>
    </section>
  );
}

function EmbedEventSection() {
  const [embedType, setEmbedType] = useState<"button" | "page">("button");

  const embedCode = `<a
  href="https://airdope.com/event/evt-6wM1ExmnDVvXzGH"
  class="airdope-checkout--button"
  data-airdope-action="checkout"
  data-airdope-event-id="evt-6wM1ExmnDVvXzGH">
  Register for Event
</a>
<script
  id="airdope-checkout"
  src="https://embed.airdope.com/checkout-button.js">
</script>`;

  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-2">Embed Event</h2>
      <p className="text-brand-gray-100 text-sm mb-6">
        Have your own site? Embed the event to let visitors know about it.
      </p>

      <div className="flex items-center space-x-2 mb-6 p-1 bg-brand-gray-300/80 border border-brand-gray-200/50 rounded-lg max-w-max">
        <button
          onClick={() => setEmbedType("button")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition ${
            embedType === "button"
              ? "bg-brand-gray-200/80 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <i
            className={`fa-solid fa-hand-pointer ${
              embedType === "button" ? "text-pink-400" : "text-gray-400"
            }`}
          />
          <span>Embed as Button</span>
          {embedType === "button" && (
            <i className="fa-solid fa-check text-pink-400 ml-3" />
          )}
        </button>
        <button
          onClick={() => setEmbedType("page")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition ${
            embedType === "page"
              ? "bg-brand-gray-200/80 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <i
            className={`fa-solid fa-pager ${
              embedType === "page" ? "text-pink-400" : "text-gray-400"
            }`}
          />
          <span>Embed Drop Page</span>
          {embedType === "page" && (
            <i className="fa-solid fa-check text-pink-400 ml-3" />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        Paste the following HTML code snippet to your page:
      </p>
      <div className="bg-brand-gray-400 rounded-lg p-4 font-mono text-sm text-gray-300 border border-brand-gray-200/50 mb-6 overflow-x-auto">
        <pre>
          <code>{embedCode}</code>
        </pre>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        This gives you the following button. Click it to see it in action!
      </p>
      <div className="bg-brand-gray-400 border border-dashed border-brand-gray-200/50 rounded-lg p-8 flex justify-center items-center mb-6">
        <button className="bg-white hover:bg-gray-200 text-brand-dark font-semibold px-6 py-3 rounded-lg text-base transition-colors">
          Register for Event
        </button>
      </div>

      <p className="text-sm text-brand-gray-100">
        If you want to use your own styling for the button, simply remove the
        `airdope-checkout--button` class from the snippet above. For advanced
        usage, check out our{" "}
        <a href="#" className="text-pink-400 hover:underline">
          example code and documentation
        </a>
        .
      </p>
    </section>
  );
}

function CancelEventSection() {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-2">Cancel Event</h2>
      <p className="text-brand-gray-100 text-sm mb-6">
        Cancel and permanently delete this event. This operation cannot be
        undone. If there are any registered guests, we will notify them that the
        event has been canceled.
      </p>
      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
        <i className="fa-solid fa-trash-can" />
        <span>Cancel Event</span>
      </button>
    </section>
  );
}
