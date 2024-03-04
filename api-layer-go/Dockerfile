FROM golang:1.21.5-alpine AS builder
RUN apk update && apk add --no-cache git

WORKDIR /go/api
COPY ./api-layer-go .

RUN go install
RUN go build -o /go/api/bin/api

FROM scratch
COPY --from=builder /go/api/bin/api .
CMD ["/api"]