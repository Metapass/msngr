"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.send = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const node_fetch_1 = require("node-fetch");
const send = (webhook, request) => __awaiter(void 0, void 0, void 0, function* () {
    let finalPayload;
    if (typeof request === "string") {
        request = { message: request };
    }
    if (webhook.startsWith("https://hooks.slack.com/services/")) {
        finalPayload = {
            text: request.message,
        };
    }
    else if (webhook.startsWith("https://discord.com/api/webhooks")) {
        if (request.message) {
            finalPayload = {
                content: request.message,
            };
        }
        else if (request.embeds) {
            finalPayload = {
                embeds: request.embeds,
            };
        }
    }
    else {
        return {
            success: false,
            reason: "Invalid webhook",
        };
    }
    return (0, node_fetch_1.default)(webhook, {
        method: "POST",
        body: JSON.stringify(finalPayload),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res.ok) {
            return {
                success: true,
                response: yield res.text(),
            };
        }
        else {
            throw new Error(res.statusText);
        }
    }))
        .catch((err) => {
        return {
            success: false,
            reason: err.message,
        };
    });
});
exports.send = send;
const ping = (webhook) => __awaiter(void 0, void 0, void 0, function* () {
    return yield send(webhook, { message: "Webhook pinged successfully!" });
});
exports.ping = ping;
