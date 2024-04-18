import './post.css'
import {Link} from "react-router-dom"
import { marked } from 'marked';

export default function Post({post}) {
  
  return (
    <>
      <div className="post">
        <Link to={`/post/${post._id}`}  className="link">
          
        {post.photo && post.photo.length!==0 && <img className='postImg' src={post.photo} alt="" />}
        <div className="postInfo">
              <h2 className="postTitle">{post.title}</h2>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            {/* this line is used to display date in proper format  */}
        </div>
        <div className="postDesc"   dangerouslySetInnerHTML={{ __html: marked(post.desc) }} />
        {/* <p className="postDesc" >{post.desc}</p> */}
        </Link>
      </div>
    </>
  )
}
