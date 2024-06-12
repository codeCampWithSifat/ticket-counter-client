/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-slate-900 text-white mt-48">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-16 lg:mx-20 py-16">
        <div>
          <h2 className="text-lg font-bold mb-10">Our Seller Service</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ipsa aperiam porro culpa distinctio neque cum optio? Eaque, facere
            esse.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-10">Quick Link</h3>
          <p>Home</p>
          <p>about</p>
          <p>Contact</p>
          <p>Blog</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-10">
            Be The Best Service Provider
          </h2>
          <p>
            <span>Become A Monthly Provider</span>
          </p>
          <p>
            <span>Reffer Your Best Friend</span>
          </p>
          <p>
            <span>Grave Your Opportunity</span>
          </p>
          <p>
            <span>Get Special Discount</span>
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© {year} Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        {/* <SocialIcons Icons={Icons} /> */}
      </div>
    </footer>
  );
};

export default Footer;
