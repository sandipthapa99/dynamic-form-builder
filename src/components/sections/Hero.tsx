import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative px-common container'>
      <div
        aria-hidden='true'
        className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
      >
        <div className='blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
        <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
      </div>
      <div className='relative pt-36 mx-auto container'>
        <div className=' text-center mx-auto'>
          <h1 className='text-gray-900 dark:text-white font-bold text-4xl md:text-6xl xl:text-7xl'>
            Build Forms—Fast & Flexible
            <p className=' mt-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>
              No Code Required
            </p>
          </h1>
          <p className=' container mt-8 text-gray-700 dark:text-gray-300'>
            Design, customize, and publish dynamic forms in minutes—no technical
            skills needed. Build smarter, faster, and easier! Design, customize,
            and publish dynamic forms without writing a single line of code.
            From simple surveys to complex workflows, our intuitive
            drag-and-drop builder lets you create forms tailored to your exact
            needs—quickly and efficiently.
          </p>
          <div className='mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6'>
            <Link
              to='sign-in'
              className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
            >
              <span className='relative text-base font-semibold text-white'>
                Get started
              </span>
            </Link>
            <Link
              to='#'
              className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max'
            >
              <span className='relative text-base font-semibold text-primary dark:text-white'>
                Learn more
              </span>
            </Link>
          </div>
          <div className='hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between'>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-gray-700 dark:text-white'>
                Free of cost
              </h6>
              <p className='mt-2 text-gray-500'>No hidden charges</p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-gray-700 dark:text-white'>
                The fastest on the market
              </h6>
              <p className='mt-2 text-gray-500'>Just drag & drop</p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-gray-700 dark:text-white'>
                Loved by all
              </h6>
              <p className='mt-2 text-gray-500'>Some text here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
