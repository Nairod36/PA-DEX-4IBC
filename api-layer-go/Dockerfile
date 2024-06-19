# Stage 1: Build the Go application
FROM golang:1.21.5-alpine As builder
RUN apk update && apk add --no-cache git build-base

WORKDIR /go/src/app
COPY ./api-layer-go /go/src/app

RUN go mod download
RUN go build -o /go/bin/api

# Stage 2: Create the final image
FROM alpine:3.14
RUN apk add --no-cache ca-certificates

WORKDIR /root/
COPY --from=builder /go/bin/api .
COPY --from=builder /go/src/app/datastruct/migration /migrations

CMD ["./api"]