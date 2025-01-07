const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fg = require('api-dylux');



dotenv.config();

const app = express();

// Global variables for server info
let currentOwner = "Miyuru Nimesh✨"; // Current user provided

// URL Validation Patterns
const urlPatterns = {
    facebook: /^https?:\/\/(www\.)?(facebook|fb)\.com\/.+/i,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/(p|reel|stories)\/.+/i,
    tiktok: /^https?:\/\/(www\.)?(tiktok\.com)\/.+/i,
    twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/i,
};

// URL Validation Function
const validateURL = (url, platform) => {
    if (!url) return false;
    return urlPatterns[platform].test(url);
};

// Create error response
const createErrorResponse = (message) => {
    return {
        success: false,
        message: message,
        owner: currentOwner,
    };
};


// Middleware
app.use(cors());
app.use(express.json());

// Custom middleware for logging
app.use((req, res, next) => {
    console.log(
        `[${serverStartTime}] ${req.method} ${req.url} - Requested by: ${currentOwner}`,
    );
    next();
});

// Routes සදහා මූලික structure එක
const socialMediaRoutes = express.Router();

// Server Info Endpoint
app.get("/api/server-info", (req, res) => {
    try {
        const serverInfo = {
            success: true,
            data: {
                currentOwner: currentOwner,


            },
        };
        res.status(200).json(serverInfo);
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// Facebook videos download endpoint
socialMediaRoutes.get("/facebook", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res
                .status(400)
                .json(createErrorResponse("URL parameter is required"));
        }
        if (!validateURL(url, "facebook")) {
            return res
                .status(400)
                .json(createErrorResponse("Invalid Facebook URL"));
        }

        // Execute the facebook download
        const result = await fg.fbdl(url);
        res.status(200).json({
            Owner: currentOwner,
            data: result,
        });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// Instagram content download endpoint
socialMediaRoutes.get("/instagram", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res
                .status(400)
                .json(createErrorResponse("URL parameter is required"));
        }
        if (!validateURL(url, "instagram")) {
            return res
                .status(400)
                .json(createErrorResponse("Invalid Instagram Username"));
        }

        // Execute the instagram download
        const result = await fg.igstory(url);
        res.status(200).json({
            Owner: currentOwner,
            data: result,
        });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});
// TikTok video download endpoint
socialMediaRoutes.get("/tiktok", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res
                .status(400)
                .json(createErrorResponse("URL parameter is required"));
        }
        if (!validateURL(url, "tiktok")) {
            return res
                .status(400)
                .json(createErrorResponse("Invalid TikTok URL"));
        }
        const result = await fg.tiktok(url);
        res.status(200).json({
            Owner: currentOwner,
            data: result,
        });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// X (Twitter) content download endpoint
socialMediaRoutes.get("/twitter", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res
                .status(400)
                .json(createErrorResponse("URL parameter is required"));
        }
        if (!validateURL(url, "twitter")) {
            return res
                .status(400)
                .json(createErrorResponse("Invalid Twitter/X URL"));
        }
        const result = await fg.twitter(url);
        res.status(200).json({
            Owner: currentOwner,
            data: result,
        });
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// URL Validator endpoint
socialMediaRoutes.get("/validate-url", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res
                .status(400)
                .json(createErrorResponse("URL parameter is required"));
        }

        // Check which platform the URL belongs to
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
                platform: platform,
                url: url,
                Owner: currentOwner,
            });
        } else {
            res.status(400).json(
                createErrorResponse("Invalid or unsupported URL"),
            );
        }
    } catch (error) {
        res.status(500).json(createErrorResponse(error.message));
    }
});

// Main routes
app.use("/api", socialMediaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(createErrorResponse("Something went wrong!"));
});

// Server configuration
const PORT = process.env.PORT || 3000;
const serverStartTime = Date.now(); // Get the current time when the server starts
app.listen(PORT, () => {
    console.log(`Server started by: ${currentOwner}`);
    console.log(`Start time: ${serverStartTime}`);
    console.log(`Server is running on port ${PORT}`);
});
