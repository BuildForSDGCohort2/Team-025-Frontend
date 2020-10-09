import React, { useEffect } from "react";

const FrameMap = ({ name, lat }) => {

  useEffect(() => {
  }, [lat]);

  const ng =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4034910.7029057336!2d6.433439748268075!3d9.032489368289802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sNigeria!5e0!3m2!1sen!2sng!4v1602152574692!5m2!1sen!2sng';
  return (
      <iframe
        title={name || "Nigeria"}
        src={lat || ng}
        className="bn-maps"
        width="100%"
        frameBorder="0"
        style={{ border: "0" }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
  );
};

export default FrameMap;
