
# Docker Run

> Objetivo: Colocar a infraestrutura completa do Doc-easy para rodar.

## Prometheus

Para o prometheus funcionar é necessário colocar um arquivo de configuração. O `prometheus.yml` para definir os clientes que o prometheus deve buscar.

## RabbitMq

1. Acessar `http://localhost:15672/`
2. Somente é necessário a criação de uma fila com o nome `files-to-process`.

## Postgres

Para o banco de dados são necessário dois schemas `dev` e `dev2`. 

## Grafana

Para configurar o Grafana é necessária a criação de dois Dashboards.

1. Dashboard -> new -> import -> Id's:

- 6756
- 17175

2. Adicionar os data sources

- Prometheus
    - http://prometheus:9090
    
- Grana Loki
    - Default

3. Configurar os logs do data source