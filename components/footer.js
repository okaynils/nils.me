import { useState, useEffect } from "react";
import { ContentWrapper } from "ui";
import { getLastCommitDate } from "pages/api/github";

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
    <footer className="w-full mt-auto flex justify-center">
      <ContentWrapper
        width="440px"
        className="border-t border-gray-500/10 py-3 w-full"
      >
        <div className="flex items-center justify-between w-full">
          <img
            src="/touch-icons/main-icon.png"
            alt="Icon"
            className="w-4 h-4"
          />
          <p className="font-mono text-xs text-gray-400">
            {loading ? "" : `last update ${lastCommitDate}`}
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
}

