import React from "react";
import classes from './PostItem.module.css'
import MyButton from "./UI/buttons/MyButton";

const PostItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>
                    {props.post.id}. {props.post.title}
                  <div>
                    {props.post.body}
                  </div>
                </strong>
            </div>
            <div className="post__btns">
              <MyButton onClick={() => props.remove(props.post)} className={classes.rmPost}>
                Delete post</MyButton>
            </div>
        </div>
    )
}

export default PostItem;