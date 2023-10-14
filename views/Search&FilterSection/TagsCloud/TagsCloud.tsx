import React from "react"

interface TagCloudProps {
  tags: string[]
  onTagClick: (youtuber: string) => void
  selectedTag: string | null
}

const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  onTagClick,
  selectedTag,
}) => {
  return (
    <div className="tag-cloud flex flex-wrap gap-4">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`
       bg-black/30 text-white p-2 mx-2 rounded-3xl cursor-pointer
       hover:bg-black/70 hover:scale-110 transform transition-all duration-500
       ${
         selectedTag === tag
           ? "bg-black/70 scale-110"
           : "hover:translate-x-3 hover:translate-y-3"
       }
     `}
          onClick={() => onTagClick(tag)}>
          {tag}
        </div>
      ))}
    </div>
  )
}

export default TagCloud
