import React from "react";
import MyInput from "./UI/inputs/MyInput";
import MySelect from "./UI/select/MySelect";


const PostFilter = ({filter, setFilter}) => {
    return (
        <div>

          <MyInput
              value={filter.query}
              onChange={event => setFilter({...filter, query: 
                event.target.value})}

              placeholder="Search"
          />
          <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, 
                    sort: selectedSort})}
                    
                defaultValue="Sort"
                options={[
                  {value: 'title', name: 'Name '},
                  {value: 'body', name: 'Body'}
                ]}
          />
        </div>
    );
};

export default PostFilter;