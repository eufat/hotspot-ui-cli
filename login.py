import mechanicalsoup
from time import sleep
import argparse


def parse_command_line_args():
    parser = argparse.ArgumentParser(
        description=('Hotspot UI login interface'))
    parser.add_argument(
        '--username', required=True, help='Hotspot UI username')
    parser.add_argument(
        '--password', required=True, help='Hotspot UI password')
    return parser.parse_args()


def main():
    args = parse_command_line_args()

    browser = mechanicalsoup.StatefulBrowser()
    browser.open("https://sso.ui.ac.id/cas/login")

    # Fill-in the search form
    browser.select_form('#fm1')
    browser["username"] = args.username
    browser["password"] = args.password

    response = browser.submit_selected()

    # print('Login Response:')
    # print(response.text)

    sleep(2)
    browser.open("http://gw.hotspot.ui.ac.id/cas/gateway.php")
    print('Finished.')


if __name__ == '__main__':
    main()