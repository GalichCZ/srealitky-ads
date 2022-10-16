const db = require("../db");
class UserController {
  async addAd(title, img, url, locality) {
    await db.query(
      `INSERT INTO ads (title, img, url, locality) values ($1, $2, $3, $4) RETURNING *`,
      [title, img, url, locality]
    );
  }

  async getAdds(req, res) {
    const { page, size } = req.query;
    try {
      const ads = await db.query(
        "SELECT * FROM ads ORDER BY ads.id LIMIT $2 OFFSET (($1-1)*$2)",
        [page, size]
      );
      res.json(ads.rows);
    } catch (error) {
      res.json("Oops, something goes wrong");
    }
  }

  async getPages(req, res) {
    const rowsDb = await db.query(`SELECT COUNT(id) FROM ads`);
    const size = req.query;
    const rows = parseInt(rowsDb.rows[0].count) / size.size;
    res.json(rows.toString());
  }
}

module.exports = new UserController();
