import django

django.setup()

from BackApp import seed


if __name__ == "__main__":
    seed.run()