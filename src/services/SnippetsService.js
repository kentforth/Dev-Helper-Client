import http from "../../http-common";

class SnippetsService {
  get(id) {
    return http.get(`/snippets/${id}`);
  }

  getAllByTagName(name) {
    return http.get(`/snippets/tag/${name}`);
  }

  getAllByTitle(title) {
    return http.get(`/snippets/title/${title}`);
  }

  update(id, data, category) {
    return http.put(`/${category}/${id}`, data);
  }

  create(data) {
    return http.post("/snippets", data);
  }

  delete(id) {
    return http.delete(`/snippets/${id}`);
  }
}

export default new SnippetsService();
