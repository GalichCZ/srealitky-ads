class UserController {
  async createAdd(req, res) {
    const { title, img } = req.body;
    console.log(title, img);
    res.json("ok");
  }
  async getAdds(req, res) {}
}

module.exports = new UserController();
