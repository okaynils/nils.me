import { useState, useEffect } from "react";
import { ContentWrapper } from "ui";
import { getLastCommitDate } from "lib/github.mjs";

export default function Footer() {
  const [lastCommitDate, setLastCommitDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLastCommitDate()
      .then(data => {
        if (data && data[0] && data[0].commit && data[0].commit.author) {
          const date = new Date(data[0].commit.author.date).toLocaleDateString();
          setLastCommitDate(date);
        } else {
          setLastCommitDate("Unknown");
        }
      })
      .catch(error => {
        console.error("Failed to fetch last commit date:", error);
        setLastCommitDate("Unknown");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <footer className="mt-10 w-full border-t border-gray-400 pt-2">
      <ContentWrapper
        width="100%"
        className="w-full"
      >
        <div className="plain-meta flex w-full items-center justify-between gap-4">
          <img
            src="/touch-icons/main-icon.png"
            alt="Icon"
            className="h-4 w-4 border border-gray-400"
          />
          <p>
            {loading ? "" : `last update ${lastCommitDate}`}
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
}
