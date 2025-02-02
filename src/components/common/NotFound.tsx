import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='bg-background relative h-[calc(100vh-90px)] flex items-center justify-center'>
      <div
        aria-hidden='true'
        className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
      >
        <div className='blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
        <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
      </div>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 z-10'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>
            404
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-foreground/60 md:text-4xl dark:text-white'>
            Something's missing.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, we can't find the data you are looking for. Verify the url or
            form ID and try again.
          </p>
          <Link
            to='/dashboard'
            className='inline-flex items-center gap-2 text-primary bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4 '
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
