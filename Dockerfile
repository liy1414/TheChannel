FROM node:20 as build

WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build

FROM golang:1.24 AS builder

WORKDIR /app

COPY ./backend .
#COPY --from=build /app/dist/channel/browser assets
RUN go mod tidy
RUN go build -o the-channel .

FROM debian:latest
WORKDIR /app
COPY --from=builder /app/the-channel . 
COPY --from=build /app/dist/channel/browser /usr/share/ng
RUN chmod +x the-channel
CMD ["./the-channel"]
