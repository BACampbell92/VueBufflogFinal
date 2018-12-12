import axios from 'axios';

const url = 'http://localhost:8000/api/posts/';

class PostServe {
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(postData => ({ ...postData,
                    createdAt: new Date(postData.createdAt)
                })));
            } catch (err) {
                reject(err);
            }
        });
    }



    static createPost(text) {
        return axios.post(url, {
            text: text
        });
    }


    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostServe