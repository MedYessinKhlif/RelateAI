import { FaLightbulb, FaUsers } from 'react-icons/fa';
import jumbotron from "../assets/Jumbotron.png";

export default function Jumbotron() {
  return (
    <div className="relative isolate overflow-x-hidden overflow-hidden px-6 py-16 sm:py-12 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Discover Your Potential With
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                RelateAI
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                RelateAI is a MERN stack application powered by Gemini AI, delivering personalized stories of renowned individuals overcoming similar user challenges.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {/* Increased image size */}
          <img
            className="pointer-events-none select-none w-full h-[30rem] object-cover"
            src={jumbotron}
            alt="Jumbotron"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="text-gray-600">
                <li className="flex gap-x-3">
                  <FaLightbulb className="mt-1 h-4 w-4 flex-none text-indigo-900" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Personalized Stories
                    </strong>{" "}
                    Experience stories of renowned individuals overcoming challenges similar to yours, tailored to inspire and motivate you.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FaUsers className="mt-1 h-4 w-4 flex-none text-indigo-900" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Community Support
                    </strong>{" "}
                    Join a community of users who share their experiences and support each other through their journeys.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
