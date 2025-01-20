import PropTypes from "prop-types";

const HomeTitle = ({ text }) => {
  return (
    <div className={`text-center my-10`}>
      {/* <div className="h-1 bg-black mx-auto w-40"/> */}
      <h1 className="text-3xl md:text-4xl font-bold blue-text">{text}</h1>
      <div className="h-1 bg-gray-600 mx-auto max-w-80"/>
    </div>
  );
};

HomeTitle.propTypes = {
  text: PropTypes.string.isRequired, // Title text (required)
};

export default HomeTitle;
