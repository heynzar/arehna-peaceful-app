import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="w-full bg-sky-50 py-4">
      <article className="w-full  max-w-screen-md mx-auto p-6 font-sans bg-sky-50 text-gray-800">
        <h1 className="text-3xl text-sky-900 font-bold mb-4">
          Privacy Policy for Arehna - Your Calm Companion
        </h1>

        <p className="mb-6">
          At Arehna, your privacy is our top priority. We are committed to
          ensuring transparency and safeguarding your data. This privacy policy
          outlines our practices regarding user information.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          1. What Information Do We Collect?
        </h2>
        <p className="mb-6">
          Arehna - Your Calm Companion does not collect, store, or process any
          user data. The extension operates fully on your local device and does
          not transmit any information to external servers or third parties.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          2. How Do We Use Information?
        </h2>
        <p className="mb-6">
          Since we do not collect any information, there is no user data to use.
          All settings and preferences, such as timer progress, are stored
          locally on your browser using local storage. This ensures your
          experience is personalized without requiring any data collection.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          3. What Information Do We Share?
        </h2>
        <p className="mb-6">
          We do not share any information because no data is collected or stored
          by the extension. Your activities within Arehna remain entirely
          private and confined to your local device.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          4. Information Security
        </h2>
        <p className="mb-6">
          Arehna is designed to work without accessing or transmitting any user
          data. By using local storage, we ensure that your preferences and
          progress remain secure and private on your own device.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          5. Data Retention
        </h2>
        <p className="mb-6">
          Since no user data is collected, there is no data to retain. Any
          settings or preferences are saved locally on your browser and can be
          cleared at any time by managing your browser's local storage settings.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          6. Changes to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may update this privacy policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. Any updates will be posted here, and the updated policy will
          be effective immediately upon posting.
        </p>

        <h2 className="text-2xl text-sky-900 font-semibold mb-2">
          7. Contact Us
        </h2>
        <p className="mb-6">
          If you have any questions or concerns about this privacy policy, feel
          free to reach out to us at{" "}
          <a
            href="mailto:heynzar@gmail.com"
            className="text-blue-500 underline"
          >
            heynzar@gmail.com
          </a>
          .
        </p>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
