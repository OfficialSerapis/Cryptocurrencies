import json

class Cryptocurrency:
    def __init__(self, name, symbol, supply, initial_price):
        self.name = name
        self.symbol = symbol
        self.supply = supply
        self.price = initial_price
        self.transactions = []

    def update_price(self, new_price):
        self.price = new_price

    def add_transaction(self, transaction):
        self.transactions.append(transaction)

class Transaction:
    def __init__(self, sender, receiver, amount):
        self.sender = sender
        self.receiver = receiver
        self.amount = amount

class Cryptocurrency:
    def __init__(self, wallet_balance):
        self.wallet_balance = wallet_balance

    def send(self, receiver_wallet, amount):
        if self.wallet_balance >= amount:
            self.wallet_balance -= amount
            receiver_wallet.wallet_balance += amount
            print(f"Sent {amount} to {receiver_wallet}.")
        else:
            print("Insufficient funds.")
