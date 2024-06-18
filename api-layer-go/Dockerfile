# Stage 1: Build the Go application
FROM golang:1.21.5-alpine AS builder
RUN apk update && apk add --no-cache git build-base

WORKDIR /go/src/app
COPY . .

RUN go mod tidy
RUN go build -o /go/bin/api

# Stage 2: Create the final image
FROM alpine:3.14
RUN apk add --no-cache ca-certificates

WORKDIR /root/
COPY --from=builder /go/bin/api .
COPY --from=builder /go/src/app/db/migrations /migrations

CMD ["./api"]
