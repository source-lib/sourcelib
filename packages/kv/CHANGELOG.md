# Change Log

All notable changes to sourcelib will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

The versions in this file adhere to [semantic versioning](https://semver.org/).

## [0.9.1]

- Fix no files being shipped in 0.9.1

## [0.9.0]

- Added detectArrays option to deserializer which automatically detects array-like keyvalue structures and resolves them as javascript arrays
- Fixed deserialization resolving things as numbers when they shouldn't have been
- Removed test script files from shipped module

## [0.8.0]

- Added KvSerializer to serialize and deserialize keyvalue documents to and from javascript objects

## [0.7.2]

- Fix parser bug
- Remove function toStringPreservePositions from keyvalue document since it did nothing

## [0.7.1]

- Fix tokenizer test

## [0.7.0]

- Revert changes made in version 0.6.0. This behavior was intended.

## [0.6.0]

- Fixed a mistake with tokenizer and parser outputting all range end to be incremented by 1 resulting in consistent but undesireable behavior

## [0.5.1]

- Fixed a syntax error

## [0.5.0]

- Fixed javascript missing from package

## [0.4.0]

- Fix build output not being contained in the package

## [0.3.3]

- This is a test release

## [0.3.2]

- This is a test release

## [0.3.1]

- Test release

## [0.3.0]

- Re-wrote keyvalue parser and improved tokenizer

## [0.2.0]

- Fixes related to project setup

## [0.1.0]

- Initial version containing kv-core extracted from the [visual studio vscode extension](https://github.com/StefanH-AT/Source-Engine-VSCode-Extension)