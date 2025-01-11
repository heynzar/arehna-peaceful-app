import { Instagram, Twitter } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <main className="h-screen w-screen flex justify-center items-center p-4">
      <section className="p-4 w-full max-w-[600px] rounded-3xl backdrop-blur-sm bg-clip-padding border-[4px] border-white/20">
        <h1 className="text-4xl font-semibold  mb-8 text-center">
          Contact Support
        </h1>

        <h2 className="text-2xl font-medium  mb-2">Email</h2>
        <a
          className="text-lg break-words underline underline-offset-4 text-blue-200 hover:text-blue-50"
          href="mailto:heyarehna@gmail.com"
        >
          heyarehna@gmail.com
        </a>

        <h2 className="text-2xl font-medium  mb-2 mt-8">Social Media</h2>
        <ul className="flex  flex-row flex-wrap gap-4 text-lg">
          <li>
            <a
              href="https://www.instagram.com/arehna_org"
              className="underline underline-offset-4 text-blue-200 hover:text-blue-50"
            >
              Instagram
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Contact;
