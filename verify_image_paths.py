import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def check_files():
    from copy_assets import PRODUCT_MAPPINGS, SERVICE_MAPPINGS
    
    missing = []
    print('Checking product images on disk:')
    for _, dst in PRODUCT_MAPPINGS:
        if not os.path.exists(dst):
            print(f'MISSING: {dst}')
            missing.append(dst)
        else:
            sz = os.path.getsize(dst)
            print(f'OK: {dst} ({sz} bytes)')

    print('\nChecking service images on disk:')
    for _, dst in SERVICE_MAPPINGS:
        if not os.path.exists(dst):
            print(f'MISSING: {dst}')
            missing.append(dst)
        else:
            sz = os.path.getsize(dst)
            print(f'OK: {dst} ({sz} bytes)')

    if missing:
        print(f'\nFAILED: {len(missing)} files missing!')
        sys.exit(1)
    else:
        print(f'\nALL {len(PRODUCT_MAPPINGS) + len(SERVICE_MAPPINGS)} ASSETS VERIFIED ON DISK!')

if __name__ == '__main__':
    check_files()
