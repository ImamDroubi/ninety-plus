import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import logo from "../../assets/images/contactImage.jpg";

const ContactUs = () => {
  return (
    <>
      <div className="flex flex-wrap mt-3">
        <img src={logo} alt="contact image" className="w-[900px]" />
        <div>
          <h1 className="text-8xl text-primary-500">تواصل معنا</h1>
          <p className="text-lg text-primary-500 mt-4">
            من خلال الارقام التالية
          </p>
          <p className="text-lg mt-4">
            <div className="flex">
              970597312558
              <BsFillTelephoneFill className="mr-2 ml-2" />
              970592910694
              <BsFillTelephoneFill className="mr-2 ml-2" />
              970596312558
              <BsFillTelephoneFill className="mr-2 ml-2" />
            </div>
          </p>
          <p className="text-lg text-primary-500 mt-4">
            أو من خلال الايميلات التالية
          </p>
          <p className="text-lg mt-4">
            <div className="flex">
              ahmadzerie@gmail.com
              <MdEmail className="mr-2 ml-2" />
              imamdroubi@gmail.com
              <MdEmail className="mr-2 ml-2" />
            </div>
          </p>
          <p className="text-lg text-primary-500 mt-4">
            أو من خلال منصات التواصل الاجتماعي{" "}
          </p>
          <p className="text-lg mt-4">
            <div className="flex">
              Ninet Plus Academy
              <FaFacebookSquare className="mr-2 ml-2" />
              Ninet_Plus_Academy
              <FaSquareInstagram className="mr-2 ml-2" />
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
