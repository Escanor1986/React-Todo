import PropTypes from "prop-types";

function Article({ id, title, category, body, author, date }) {
  return (
    <div key={id}>
      <h1>{title}</h1>
      <ul>
        <li>{category}</li>
        <li>{body}</li>
        <li>{author}</li>
        <li>{date}</li>
      </ul>
    </div>
  );
}

Article.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  body: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string.isRequired,
};

export default Article;
