import '../styles/globals.css'
import Link from "next/link";
import {motion} from 'framer-motion';


function MyApp({ Component, pageProps, router }) {
  
   return (
     <div
       className="box"
       style={{
         background: `linear-gradient(104deg, rgba(75,224,224,1) 0%, rgba(231,127,205,1) 100%)`,
         marginTop: 0,
       }}
     >
       <motion.div
         style={{
           marginBottom: 0,
         }}
         initial="hidden"
         animate="visible"
         variants={{
           hidden: {
             scale: 0.8,
             opacity: 0,
           },
           visible: {
             scale: 1,
             opacity: 1,
             transition: {
               delay: 0.4,
             },
           },
         }}
       >
         <nav
           style={{
             height: "20vh",
           }}
           className="border-b p-6 nav-back"
         >
           <p className="text-4xl font-bold title">
             <span>Cryplistic</span> MarketPlace
           </p>

           <div className="flex mt-4 ">
             <Link href="/">
               <a className="mr-6 text-pink-500 nav-link">Home</a>
             </Link>
             <Link href="/create-item">
               <a className="mr-6 text-pink-500  nav-link">
                 Sell Digital Asset
               </a>
             </Link>
             <Link href="/my-assets">
               <a className="mr-6 text-pink-500 nav-link">My Digital Assets</a>
             </Link>
             <Link href="/creator-dashboard">
               <a className="mr-6 text-pink-500 nav-link">Creator Dashboard</a>
             </Link>
           </div>
         </nav>
       </motion.div>

       <motion.div
         key={router.route}
         initial="pageInitial"
         animate="pageAnimate"
         variants={{
           pageInitial: {
             opacity: 0,
           },
           pageAnimate: {
             opacity: 1,
           },
         }}
       >
         <Component {...pageProps} />
       </motion.div>
     </div>
   );
}

export default MyApp
