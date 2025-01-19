import PropTypes from "prop-types";

const Title = ({ text }) => {
  return (
    <div className={`text-center`}>
      {/* <div className="h-1 bg-black mx-auto w-40"/> */}
      <h1 className="text-3xl md:text-4xl font-bold blue-text">{text}</h1>
      <div className="h-1 bg-gray-600 mx-auto w-40"/>
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired, // Title text (required)
};

export default Title;
