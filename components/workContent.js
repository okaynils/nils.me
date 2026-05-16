export default function WorkContent({ post }) {
  return (
    <div
      key={post.title}
      className="w-full pb-20"
    >
      <article className="old-box">
        <h1 className="old-box-title page-title">
          {post.title}
        </h1>
        <div className="old-box-body">
          {post?.icon ? (
            <div className="mb-3 h-12 w-12">
              <img
                src={post?.icon}
                alt={post.title}
                className="border border-gray-400"
              />
            </div>
          ) : (
            ""
          )}
          {post?.tech ? (
            <div className="plain-meta mb-4 flex flex-wrap gap-x-2 gap-y-1">
              {post?.tech.map((tech) => (
                <div
                  key={tech}
                >
                  [{tech}]
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            {post?.web ? (
              <a
                href={post?.web}
                target="_blank"
                rel="noopener noreferrer"
              >
                [web app]
              </a>
            ) : (
              ""
            )}
            {post?.ios ? (
              <a
                href={post?.ios}
                target="_blank"
                rel="noopener noreferrer"
              >
                [ios app]
              </a>
            ) : (
              ""
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className="post-content"
          />
        </div>
      </article>
    </div>
  );
}
