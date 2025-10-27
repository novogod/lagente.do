# Copilot Instructions for lagente.do

## Project Overview
This is the lagente.do project - an agent-based application. This file will be updated as the codebase evolves.

## VPS Access
- **VPS IP**: 193.43.134.141
- **SSH Key**: `/Users/andreyprokhorov/ssh/ssh/hostinger_key`
- **SSH Command**: `ssh -i /Users/andreyprokhorov/ssh/ssh/hostinger_key root@193.43.134.141`

### SSH Session Management
**IMPORTANT**: When SSH connection times out ("Operation timed out" or "Connection reset"), the session key has expired. 

**Solution**: Use simpler command format without quotes:
- ❌ **Don't**: `ssh -i key root@ip 'command'`  (can cause timeouts)
- ✅ **Do**: `ssh -i key root@ip command`  (more reliable)

If timeout persists, it means the SSH session needs to be renewed - wait a moment and retry with the simpler format.

## Architecture & Structure
*To be documented as the project structure emerges*

## Development Workflow
*To be documented as build and test processes are established*

## Key Patterns & Conventions
*To be documented as coding patterns emerge*

## Important Files & Directories
*To be documented as the project structure is established*

## External Dependencies & Integrations
*To be documented as dependencies are added*

---

*This file should be updated as the codebase develops to reflect actual patterns and conventions found in the project.*