const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fg = require("api-dylux");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const serverStartTime = Date.now(); // Server start time
let currentOwner = "Miyuru Nimesh✨";


// Standard error response format
const createErrorResponse = (message) => ({
    success: false,
    message,
    owner: currentOwner,
});

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${serverStartTime}] ${req.method} ${req.url} - Requested by: ${currentOwner}`);
    next();
});

// Sub-router for all API endpoints
const socialMediaRoutes = express.Router();

// Server Info Endpoint
app.get("/api/server-info", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                currentOwner,
            },
        });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// Facebook download
socialMediaRoutes.get("/facebook", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json(createErrorResponse("URL parameter is required"));
    if (!validateURL(url, "facebook")) return res.status(400).json(createErrorResponse("Invalid Facebook URL"));
    try {
        const result = await fg.fbdl(url);
        res.status(200).json({ Owner: currentOwner, data: result });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});


// TikTok
socialMediaRoutes.get("/tiktok", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json(createErrorResponse("URL parameter is required"));
    if (!validateURL(url, "tiktok")) return res.status(400).json(createErrorResponse("Invalid TikTok URL"));
    try {
        const result = await fg.tiktok(url);
        res.status(200).json({ Owner: currentOwner, data: result });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// Twitter/X
socialMediaRoutes.get("/twitter", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json(createErrorResponse("URL parameter is required"));
    if (!validateURL(url, "twitter")) return res.status(400).json(createErrorResponse("Invalid Twitter/X URL"));
    try {
        const result = await fg.twitter(url);
        res.status(200).json({ Owner: currentOwner, data: result });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// NPM search
socialMediaRoutes.get("/npmsearch", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json(createErrorResponse("Query parameter is required"));
    try {
        const result = await fg.npmSearch(url);
        res.status(200).json({ Owner: currentOwner, data: result });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});


// URL Validator
socialMediaRoutes.get("/validate-url", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json(createErrorResponse("URL parameter is required"));

    let platform = null;
    for (const [key, pattern] of Object.entries(urlPatterns)) {
        if (pattern.test(url)) {
            platform = key;
            break;
        }
    }

    if (platform) {
        res.status(200).json({
            success: true,
            message: "Valid URL detected",
            platform,
            url,
            Owner: currentOwner,
        });
    } else {
        res.status(400).json(createErrorResponse("Invalid or unsupported URL"));
    }
});

// Use all routes under /api
app.use("/api", socialMediaRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(createErrorResponse("Something went wrong!"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started by: ${currentOwner}`);
    console.log(`Start time: ${serverStartTime}`);
    console.log(`Server is running on port ${PORT}`);
});
