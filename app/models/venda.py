from app import db
from datetime import datetime

class Venda(db.Model):
    __tablename__ = 'vendas'

    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    valor_total = db.Column(db.Float, nullable=False)
    data_venda = db.Column(db.DateTime, default=datetime.utcnow)

    # relacionamento com Produto (estoque)
    produto = db.relationship('Produto', backref=db.backref('vendas', lazy=True))

    def __repr__(self):
        return f"<Venda {self.id}>"