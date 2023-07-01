import path from "path";
import express from "express";
import morgan from "morgan";

const app = express();

// template engine: ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
    res.render("index");
});

// joke api route
app.get("/api/random", async (req, res) => {
    try {
        const category = req.query["category"];
        const data = await fetch("https://api.chucknorris.io/jokes/random" +
            (category ? "?category=" + category : ""))
            .then(data => data.json());

        res.json(data);
    } catch(err) {
        res.json({
            error: "api.chucknorris.io/jokes error"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
     console.log("App listening at: http://localhost:" + PORT);
});
