import PropTypes from "prop-types";
import Article from "./Article";

function Articles({ displayArticle }) {
  const articles = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      category: "Technology",
      date: "2024-04-10",
    },
    {
      id: 2,
      title: "Pellentesque habitant morbi tristique",
      body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      author: "Jane Smith",
      category: "Travel",
      date: "2024-04-11",
    },
    {
      id: 3,
      title: "Nulla facilisi",
      body: "Nulla facilisi. Phasellus non mauris vitae erat consequat auctor eu in elit.",
      author: "Alice Johnson",
      category: "Health",
      date: "2024-04-12",
    },
    {
      id: 4,
      title: "Sed ut perspiciatis unde omnis iste",
      body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      author: "Bob Williams",
      category: "Science",
      date: "2024-04-13",
    },
  ];

  return (
    <>
      <section style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "700px" }}>
          <h1 className="mb-20">Liste des articles</h1>
          {displayArticle ? (
            <div className="card p-20">
              <h2 className="mb-10">{`Titre de l'article`}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                consectetur asperiores dicta iusto inventore eius corrupti eum!
                Iste doloremque delectus voluptas quos. Et at consectetur
                similique suscipit officiis cum asperiores? Sunt maxime
                repudiandae quaerat debitis. Nobis asperiores, soluta
                perferendis voluptatibus vel dignissimos optio ipsam repellat
                repellendus tenetur illo blanditiis, modi placeat non
                consequuntur quibusdam dolorum, temporibus quod suscipit.
              </p>
            </div>
          ) : (
            <p>Aucun Article</p>
          )}
        </div>
        {articles
          ? articles.map(elem => (
              <Article
                key={elem.id}
                title={elem.title}
                body={elem.body}
                author={elem.author}
                category={elem.category}
                date={elem.date}
              />
            ))
          : null}
      </section>
    </>
  );
}

Articles.propTypes = {
  displayArticle: PropTypes.bool.isRequired,
};

export default Articles;
