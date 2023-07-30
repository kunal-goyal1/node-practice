const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;

// express.json() is a method inbuilt in express to receive and parse the JSON data in the request body. This method is called as a middleware in your application using the code:
app.use(express.json());

// no need to use / with folders in path.join
// express.static() is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use("/", express.static(path.join(__dirname, "public")));
// app.use can be used without '/' as well, it takes the directory address wrt to server file by default
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
    res.status(404);
    // accepts(): accepts is a method of the req object used to determine the best response type the client can accept based on the HTTP "Accept" header. The "Accept" header specifies the media types (content types) the client can handle.
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not found" });
    } else {
        res.type("txt").send("404 Not found");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
